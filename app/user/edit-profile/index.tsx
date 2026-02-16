import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import Flexbox from "@/components/flexbox";
import { Button, Icon, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import CustomText from "@/components/custom-text";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth-store";
import CustomButton from "@/components/custom-button";
import Toast from "react-native-toast-message";
import { updateUserProfile } from "@/services/users";
import { IUser } from "@/interfaces";

const EditProfilePage = () => {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: { name: string; email: string }) => {
    try {
      setLoading(true);

      const response = await updateUserProfile({
        name: data.name,
        email: data.email,
      });

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.message,
        });
        setUser(response.data as IUser);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2:
          error instanceof Error
            ? error.message
            : "An error occurred while updating profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaLayoutWrapper>
      <Flexbox padding={20} gap={20}>
        <Flexbox
          flexDirection="row"
          gap={20}
          alignContent="center"
          alignItems="center"
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Icon source="arrow-left" size={24} />
          </TouchableOpacity>

          <CustomText value="Edit Profile" fontSize={25} fontWeight="700" />
        </Flexbox>

        <Flexbox gap={10}>
          <Image
            source={{
              uri: user?.profile_picture || "http://via.placeholder.com/150",
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              alignSelf: "center",
              borderColor: "#ccc",
              borderWidth: 2,
              padding: 5,
            }}
          />
          <Button
            style={{ alignSelf: "center", marginTop: 10 }}
            mode="outlined"
          >
            <CustomText value="Change" />
          </Button>
        </Flexbox>

        <Flexbox gap={20}>
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
                  disabled
                />
              )}
              name="email"
            />
          </View>

          <CustomButton onPress={handleSubmit(onSubmit)} loading={loading}>
            Save Changes
          </CustomButton>
        </Flexbox>
      </Flexbox>
    </SafeAreaLayoutWrapper>
  );
};

export default EditProfilePage;
