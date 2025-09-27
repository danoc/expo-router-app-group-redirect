import { View, Text } from "react-native";

export default function Foo() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Foo Screen</Text>
      <Text style={{ marginTop: 10 }}>This is the initial route</Text>
    </View>
  );
}