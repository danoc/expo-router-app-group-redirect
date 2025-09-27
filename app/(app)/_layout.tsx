import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="foo"
    >
      <Stack.Screen name="foo" />
    </Stack>
  );
}