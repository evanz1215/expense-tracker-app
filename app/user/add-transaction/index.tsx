import TransactionForm from "@/components/transaction-form";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import React from "react";

const AddTransaction = () => {
  return (
    <SafeAreaLayoutWrapper>
      <TransactionForm formType="add" />
    </SafeAreaLayoutWrapper>
  );
};

export default AddTransaction;
