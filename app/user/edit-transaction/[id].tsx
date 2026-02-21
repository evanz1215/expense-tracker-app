import { View, Text } from "react-native";
import React from "react";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import TransactionForm from "@/components/transaction-form";

const EditTransaction = () => {
  return (
    <SafeAreaLayoutWrapper>
      <TransactionForm formType="edit" />
    </SafeAreaLayoutWrapper>
  );
};

export default EditTransaction;
