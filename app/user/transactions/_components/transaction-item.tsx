import { TouchableOpacity } from "react-native";
import React from "react";
import { ITransaction } from "@/interfaces";
import Flexbox from "@/components/flexbox";
import CustomText from "@/components/custom-text";
import dayjs from "dayjs";
import { useRouter } from "expo-router";

const TransactionItem = ({ transaction }: { transaction: ITransaction }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => router.push(`/user/transactions/${transaction.id}` as any)}
    >
      <Flexbox
        padding={10}
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 4,
        }}
        marginVertical={10}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flexbox>
          <CustomText
            value={transaction.name}
            fontSize={16}
            fontWeight="600"
            marginBottom={5}
          />

          <Flexbox flexDirection="row" gap={10}>
            <CustomText
              value={transaction.category.toUpperCase()}
              color="#737373ff"
              fontSize={13}
            />
            <CustomText value="．" />
            <CustomText
              value={dayjs(transaction.date).format("MMM DD, YYYY")}
              color="#737373ff"
              fontSize={13}
            />
          </Flexbox>
        </Flexbox>

        <CustomText
          value={`${transaction.type === "income" ? "+" : "-"}$${transaction.amount}`}
          fontSize={16}
          fontWeight="700"
          color={transaction.type === "income" ? "#16a34aff" : "#dc2626ff"}
        />
      </Flexbox>
    </TouchableOpacity>
  );
};

export default TransactionItem;
