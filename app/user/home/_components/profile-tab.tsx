import CustomButton from "@/components/custom-button";
import CustomText from "@/components/custom-text";
import { primaryColor } from "@/constants";
import { logoutUser } from "@/services/users";
import { useAuthStore } from "@/store/auth-store";
import { RelativePathString, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, View } from "react-native";
import Toast from "react-native-toast-message";

const ProfileTab = () => {
  const [loading, setLoading] = useState(false);
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
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff", gap: 20 }}>
      <View>
        <Image
          source={{
            uri: user?.profile_picture || "http://via.placeholder.com/150",
          }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            alignSelf: "center",
          }}
        />
      </View>

      <View>
        <CustomText
          value={user?.name || "N/A"}
          fontSize={25}
          color={primaryColor}
          fontWeight="700"
        />

        <CustomText
          value={user?.email || "N/A"}
          fontSize={16}
          color="#606060ff"
          fontWeight="700"
        />
      </View>

      <CustomButton
        loading={loading}
        onPress={() => {
          router.push("/user/edit-profile" as RelativePathString);
        }}
        mode="outlined"
      >
        Edit Profile
      </CustomButton>

      <CustomButton loading={loading} onPress={logoutHandler}>
        Logout
      </CustomButton>
    </View>
  );
};

export default ProfileTab;
