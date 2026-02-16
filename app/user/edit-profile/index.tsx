import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import Flexbox from "@/components/flexbox";
import { Icon, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import CustomText from "@/components/custom-text";
import { Controller, useForm } from "react-hook-form";

const EditProfilePage = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  return (
    <SafeAreaLayoutWrapper>
      <Flexbox padding={20}>
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

        <Flexbox>
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
        </Flexbox>
      </Flexbox>
    </SafeAreaLayoutWrapper>
  );
};

export default EditProfilePage;
