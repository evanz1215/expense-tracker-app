import CustomButton from "@/components/custom-button";
import { primaryColor } from "@/constants";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import { Link, RelativePathString, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

const LandingScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaLayoutWrapper>
      <View style={styles.container}>
        <View style={styles.branding}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
              marginBottom: 20,
            }}
          >
            <Icon source="finance" size={60} color={primaryColor} />
          </View>

          <Text style={{ color: "white", fontSize: 40, fontWeight: "700" }}>
            FinTrack
          </Text>

          <Text
            style={{
              color: "#e4e4e4aa",
              fontSize: 15,
              marginTop: 10,
              textAlign: "center",
              paddingHorizontal: 20,
              fontWeight: "600",
            }}
          >
            Take control of your finances with FinTrack - Your ultimate expense
          </Text>
        </View>
        <View style={styles.navigations}>
          <CustomButton
            mode="outlined"
            onPress={() => router.push("/register" as RelativePathString)}
          >
            Get Started
          </CustomButton>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Already have an account?{" "}
            </Text>
            <Link href={"/login"} style={{ textDecorationLine: "underline" }}>
              <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
                Login
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaLayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  branding: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navigations: {
    display: "flex",
    padding: 20,
    gap: 10,
  },
});

export default LandingScreen;
