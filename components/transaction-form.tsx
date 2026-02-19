import { primaryColor } from "@/constants";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Icon, TextInput } from "react-native-paper";
import CustomButton from "./custom-button";
import CustomText from "./custom-text";
import Flexbox from "./flexbox";
import { DatePickerModal } from "react-native-paper-dates";
import dayjs from "dayjs";

const TransactionForm = ({ formType }: { formType: "add" | "edit" }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      description: "",
      date: null,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      console.log("🚀 ~ onSubmit ~ data:", data);
      // TODO: implement submit logic
    } catch (error) {
      console.error("Error submitting transaction form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flexbox
      flex={1}
      gap={20}
      paddingVertical={25}
      paddingHorizontal={30}
      style={{ backgroundColor: "#fff" }}
    >
      {/* Header */}
      <Flexbox flexDirection="row" alignItems="center" gap={15}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon source="arrow-left" size={24} color={primaryColor} />
        </TouchableOpacity>

        <CustomText
          value={formType === "add" ? "Add Transaction" : "Edit Transaction"}
          color={primaryColor}
          fontSize={25}
          fontWeight="700"
        />
      </Flexbox>

      {/* Form Fields */}
      <Flexbox flex={1} gap={20}>
        {/* Name */}
        <Flexbox>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Transaction Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                label="Name"
                autoCapitalize="words"
              />
            )}
            name="name"
          />
          {errors.name && (
            <Text style={{ color: "red" }}>This is required.</Text>
          )}
        </Flexbox>

        {/* Amount */}
        <Flexbox>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Amount"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                label="Amount"
                keyboardType="decimal-pad"
              />
            )}
            name="amount"
          />
          {errors.amount && (
            <Text style={{ color: "red" }}>Please enter a valid amount.</Text>
          )}
        </Flexbox>

        {/* Description */}
        <Flexbox>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Description (optional)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                label="Description"
                multiline
                numberOfLines={3}
              />
            )}
            name="description"
          />
        </Flexbox>

        {/* Date */}
        <Flexbox>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  justifyContent: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Button
                  onPress={() => setOpen(true)}
                  uppercase={false}
                  mode="outlined"
                >
                  Pick single date
                </Button>
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={value ? dayjs(value).toDate() : dayjs().toDate()}
                  onConfirm={(params) => {
                    onChange(params.date);
                    setOpen(false);
                  }}
                />
              </View>
            )}
            name="date"
          />
        </Flexbox>

        <CustomButton
          loading={loading}
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
        >
          {formType === "add" ? "Add Transaction" : "Update Transaction"}
        </CustomButton>
      </Flexbox>
    </Flexbox>
  );
};

export default TransactionForm;
