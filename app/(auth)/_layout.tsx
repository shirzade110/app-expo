import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ title: "Login", animation: "simple_push" }}
      />
      <Stack.Screen
        name="register"
        options={{ title: "Register", animation: "fade" }}
      />
    </Stack>
  );
}
