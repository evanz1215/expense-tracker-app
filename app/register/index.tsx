import CustomButton from "@/components/custom-button";
import CustomText from "@/components/custom-text";
import { primaryColor } from "@/constants";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import { registerNewUser } from "@/services/users";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

const RegisterScreen = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await registerNewUser(data);
    console.log("🚀 ~ onSubmit ~ response:", response);

    setLoading(false);
    if (response.success) {
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "You can now login with your credentials.",
      });

      setTimeout(() => {
        router.push("/login");
      }, 500);
    } else {
      // alert("Registration failed. Please try again.");
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: response.message,
      });
    }
  };

  return (
    <SafeAreaLayoutWrapper>
      <View
        style={{
          flex: 1,
          paddingVertical: 25,
          paddingHorizontal: 30,
          gap: 20,
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity onPress={() => router.push("/landing")}>
          <Icon source="arrow-left" size={30} />
        </TouchableOpacity>

        <View style={{ gap: 10, marginTop: 80 }}>
          <CustomText
            value="Create Account"
            fontSize={35}
            fontWeight="700"
            color={primaryColor}
          />

          <CustomText
            value="Enter all the details to continue."
            fontSize={16}
            fontWeight="600"
            color="#454545ff"
          />
        </View>

        <View style={{ flex: 1, gap: 30 }}>
          {/* First Name */}
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="First name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  mode="outlined"
                  label="First Name"
                />
              )}
              name="name"
            />
            {errors.name && <Text>This is required.</Text>}
          </View>

          {/* Email */}
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9 .-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  mode="outlined"
                  label="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email && <Text>{errors.email.message}</Text>}
          </View>

          {/* Password */}
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  mode="outlined"
                  label="Password"
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && <Text>{errors.password.message}</Text>}
          </View>

          <CustomButton
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
          >
            Register
          </CustomButton>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <CustomText
              value="Already have an account?"
              color={primaryColor}
              fontSize={16}
              fontWeight="600"
            />
            <Link href={"/login"} style={{ textDecorationLine: "underline" }}>
              <CustomText
                value="Login"
                color={primaryColor}
                fontSize={16}
                fontWeight="600"
              />
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaLayoutWrapper>
  );
};

export default RegisterScreen;
