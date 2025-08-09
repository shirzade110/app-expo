import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "./store";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTintColor: theme.title,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{ title: "Tab Title", headerShown: false }}
          />
          <Stack.Screen name="about" options={{ title: "About Title" }} />
          <Stack.Screen name="contact" options={{ title: "Contact" }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, animation: "fade" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
