import { ITransaction } from "@/interfaces";
import { create } from "zustand";

export interface TransactionsState {
  selectedTransactionForEdit: ITransaction | null;
  setSelectedTransactionForEdit: (transaction: ITransaction | null) => void;
}

export const useTransactionsStore = create<TransactionsState>((set) => ({
  selectedTransactionForEdit: null,
  setSelectedTransactionForEdit: (transaction) =>
    set({ selectedTransactionForEdit: transaction }),
}));
