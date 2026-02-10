import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import { Redirect, useRootNavigationState } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const IndexScreen = () => {
  const rootNavigationState = useRootNavigationState();

  if (rootNavigationState?.key) {
    return <Redirect href="/landing" />;
  }

  return (
    <SafeAreaLayoutWrapper>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Checking auth status ...</Text>
      </View>
    </SafeAreaLayoutWrapper>
  );
};

export default IndexScreen;
