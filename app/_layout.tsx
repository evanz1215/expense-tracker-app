import { primaryColor } from "@/constants";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";

if (Platform.OS === "android") {
  NavigationBar.setButtonStyleAsync("dark");
}

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: primaryColor,
    },
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
