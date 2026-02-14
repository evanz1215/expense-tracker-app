import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const SafeAreaLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      <Toast position="top" topOffset={50} />
    </>
  );
};

export default SafeAreaLayoutWrapper;
