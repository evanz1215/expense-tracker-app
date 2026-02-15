import { primaryColor } from "@/constants";
import { AuthState, useAuthStore } from "@/store/auth-store";
import * as NavigationBar from "expo-navigation-bar";
import { RelativePathString, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
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
  const router = useRouter();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: primaryColor,
    },
  };

  const { checkUserSession, user }: AuthState = useAuthStore();

  useEffect(() => {
    if (!user) {
      checkUserSession();
    }
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/user/home" as RelativePathString);
    }
  }, [user]);

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
