# Expo Router Group URL Bug Reproduction

This is a minimal reproduction of a bug in Expo Router where group names briefly appear in URLs before being stripped client-side when using server-side rendering.

## The Bug

When using **server-side rendering** (`output: "server"`) and navigating to the root URL (`/`) without an index file, Expo Router:
1. Initially shows `/(app)/foo` in the browser URL (exposing the group name)
2. Then strips the `(app)` portion client-side
3. Results in the final URL `/foo`

This creates a flicker where users briefly see the internal file structure in the URL.

## Key Finding

**The bug only occurs with `output: "server"` (SSR mode)**. In client-side rendering mode, the group name is never exposed.

## Setup

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Start the development server:
```bash
npm run web
```

## Steps to Reproduce

1. Open the app in a web browser (http://localhost:8081)
2. Navigate to the root URL `/`
3. **Observe**: The URL briefly shows `/(app)/foo` before changing to `/foo`

## Minimal File Structure

```
app/
├── _layout.tsx          # Root layout
└── (app)/               # Group (should be invisible in URLs)
    ├── _layout.tsx      # Group layout with initialRouteName="foo"
    └── foo.tsx          # The only route
```

Note: There is intentionally no `app/index.tsx` file.

## Critical Configuration

In `app.json`:
```json
{
  "web": {
    "output": "server"  // THIS CAUSES THE BUG
  },
  "plugins": [
    ["expo-router", {
      "redirects": [{
        "source": "/index",
        "destination": "/foo"
      }]
    }]
  ]
}
```

## Expected Behavior

The URL should directly show `/foo` without exposing the `(app)` group name.

## Actual Behavior

With SSR enabled, the URL shows:
1. `/(app)/foo` (briefly visible)
2. `/foo` (after client-side cleanup)

## Environment

- Expo SDK: 54
- Expo Router: ~6.0.8
- Platform: Web with SSR (`output: "server"`)
- The issue does NOT occur with client-side rendering