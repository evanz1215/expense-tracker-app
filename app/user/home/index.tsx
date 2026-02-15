import CustomButton from "@/components/custom-button";
import CustomText from "@/components/custom-text";
import { primaryColor } from "@/constants";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import { logoutUser } from "@/services/users";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

const UserHomePage = () => {
  const [loading, setLoading] = React.useState(false);
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const logoutHandler = async () => {
    setLoading(true);
    const response = await logoutUser();

    if (response.success) {
      Toast.show({
        type: "success",
        text1: "Logout Successful",
        text2: response.message,
      });
      setUser(null);
      setLoading(false);
      setTimeout(() => {
        router.replace("/landing");
      }, 500);
    } else {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Logout Failed",
        text2: "An error occurred while logging out.",
      });
    }
  };

  return (
    <SafeAreaLayoutWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          padding: 10,
        }}
      >
        <CustomText
          value={`Welcome ${user?.name || "User"}!`}
          fontSize={30}
          fontWeight="700"
          color={primaryColor}
        />

        <CustomText
          value={`Email: ${user?.email || "Not provided"}`}
          fontSize={16}
          fontWeight="600"
        />

        <CustomButton loading={loading} onPress={logoutHandler}>
          Logout
        </CustomButton>
      </View>
    </SafeAreaLayoutWrapper>
  );
};

export default UserHomePage;
