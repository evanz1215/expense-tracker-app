import TransactionForm from "@/components/transaction-form";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import React from "react";

const EditTransaction = () => {
  return (
    <SafeAreaLayoutWrapper>
      <TransactionForm formType="edit" />
    </SafeAreaLayoutWrapper>
  );
};

export default EditTransaction;
