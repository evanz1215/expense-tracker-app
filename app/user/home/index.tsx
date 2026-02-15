import { primaryColor } from "@/constants";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import { RelativePathString, useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { BottomNavigation, Icon } from "react-native-paper";
import HomeTab from "./_components/home-tab-";
import ProfileTab from "./_components/profile-tab";

const UserHomePage = () => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const tabs = [
    {
      key: "home",
      title: "Home",
      component: HomeTab,
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "profile",
      title: "Profile",
      component: ProfileTab,
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: HomeTab,
    profile: ProfileTab,
  });

  return (
    <SafeAreaLayoutWrapper>
      <View
        style={{
          position: "absolute",
          bottom: 90,
          backgroundColor: primaryColor,
          height: 60,
          width: 60,
          left: "50%",
          zIndex: 1,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ translateX: -30 }],
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/user/add-transaction" as RelativePathString);
          }}
        >
          <Icon source="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <BottomNavigation
        navigationState={{ index, routes: tabs }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: "#e8e8e8ff", height: 80 }}
        // add animation to tab transition
        shifting={true}
      />
    </SafeAreaLayoutWrapper>
  );
};

export default UserHomePage;
