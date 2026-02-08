import { primaryColor } from "@/constants";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Provider as PaperProvider,
  useTheme
} from "react-native-paper";
import "react-native-reanimated";

NavigationBar.setButtonStyleAsync("dark");

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const theme = useTheme();

  theme.colors.primary = primaryColor;

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PaperProvider>
  );
}
