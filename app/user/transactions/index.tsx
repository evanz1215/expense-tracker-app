import CustomText from "@/components/custom-text";
import Flexbox from "@/components/flexbox";
import { primaryColor } from "@/constants";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import { getTransactionsByUserId } from "@/services/transactions";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import Toast from "react-native-toast-message";
import TransactionItem from "./_components/transaction-item";
import { ITransaction } from "@/interfaces";

const TransactionScreen = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response: any = await getTransactionsByUserId(user!.id);
      if (response.success) {
        setTransactions(response.data || []);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Toast.show({
        type: "error",
        text1: "Error fetching transactions",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Flexbox flex={1} justifyContent="center" alignItems="center">
        <CustomText value="Loading transactions..." fontSize={16} />
      </Flexbox>
    );
  }

  return (
    <SafeAreaLayoutWrapper>
      {/* Header */}
      <Flexbox flexDirection="row" alignItems="center" gap={10} padding={20}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon source="arrow-left" size={24} color={primaryColor} />
        </TouchableOpacity>

        <CustomText
          value="Transactions"
          color={primaryColor}
          fontSize={25}
          fontWeight="700"
        />
      </Flexbox>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={() => (
          <Flexbox justifyContent="center" alignItems="center">
            <CustomText value="No transactions found." fontSize={16} />
          </Flexbox>
        )}
      />
    </SafeAreaLayoutWrapper>
  );
};

export default TransactionScreen;
