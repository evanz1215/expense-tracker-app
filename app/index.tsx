import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const IndexScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatusAndNavigate = async () => {
      try {
        // simulate 2 second delay and navigate to login /landing

        router.push("/landing" as RelativePathString);
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuthStatusAndNavigate();
  }, [router]);

  return (
    <SafeAreaLayoutWrapper>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Checking auth status ...</Text>
      </View>
    </SafeAreaLayoutWrapper>
  );
};

export default IndexScreen;
