import CustomButton from "@/components/custom-button";
import CustomText from "@/components/custom-text";
import Flexbox from "@/components/flexbox";
import { primaryColor } from "@/constants";
import { ITransaction } from "@/interfaces";
import SafeAreaLayoutWrapper from "@/safe-area-layout-wrapper";
import {
  deleteTransactionById,
  getTransactionById,
} from "@/services/transactions";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";

const INCOME_COLOR = "#16a34aff";
const EXPENSE_COLOR = "#dc2626ff";
const DIVIDER_COLOR = "#e5e7eb";
const LABEL_COLOR = "#6b7280";

const TransactionDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const response: any = await getTransactionById(Number(id));
        if (response.success) {
          setTransaction(response.data);
        } else {
          Toast.show({ type: "error", text1: "Failed to load transaction." });
          router.back();
        }
      } catch {
        Toast.show({ type: "error", text1: "An error occurred." });
        router.back();
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id, router]);

  const handleEdit = () => {
    router.push(`/user/edit-transaction/${id}` as RelativePathString);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(true);
              const response: any = await deleteTransactionById(Number(id));
              if (response.success) {
                Toast.show({
                  type: "success",
                  text1: "Deleted",
                  text2: response.message,
                });
                router.back();
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
                    : "Could not delete transaction.",
              });
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  if (loading || !transaction) {
    return (
      <Flexbox flex={1} justifyContent="center" alignItems="center">
        <CustomText value="Loading..." fontSize={16} />
      </Flexbox>
    );
  }

  const isIncome = transaction.type === "income";
  const amountColor = isIncome ? INCOME_COLOR : EXPENSE_COLOR;
  const amountPrefix = isIncome ? "+" : "-";

  return (
    <SafeAreaLayoutWrapper>
      {/* Header */}
      <Flexbox
        flexDirection="row"
        alignItems="center"
        gap={10}
        padding={20}
        paddingVertical={16}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Icon source="arrow-left" size={24} color={primaryColor} />
        </TouchableOpacity>
        <CustomText
          value="Transaction Detail"
          color={primaryColor}
          fontSize={22}
          fontWeight="700"
        />
      </Flexbox>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Amount Card */}
        <Flexbox
          margin={20}
          marginVertical={10}
          padding={24}
          alignItems="center"
          gap={8}
          style={{
            ...styles.card,
            borderTopWidth: 4,
            borderTopColor: amountColor,
          }}
        >
          <Flexbox
            style={{ ...styles.typeBadge, backgroundColor: amountColor + "1a" }}
            paddingHorizontal={14}
            padding={6}
            flexDirection="row"
            gap={6}
            alignItems="center"
          >
            <Icon
              source={isIncome ? "arrow-down-circle" : "arrow-up-circle"}
              size={16}
              color={amountColor}
            />
            <CustomText
              value={isIncome ? "INCOME" : "EXPENSE"}
              color={amountColor}
              fontSize={12}
              fontWeight="700"
            />
          </Flexbox>

          <CustomText
            value={`${amountPrefix}$${transaction.amount.toLocaleString()}`}
            color={amountColor}
            fontSize={40}
            fontWeight="700"
          />

          <CustomText
            value={transaction.name}
            color={primaryColor}
            fontSize={18}
            fontWeight="600"
          />
        </Flexbox>

        {/* Details Card */}
        <Flexbox margin={20} marginVertical={10} style={styles.card}>
          <DetailRow
            icon="tag-outline"
            label="Category"
            value={
              transaction.category.charAt(0).toUpperCase() +
              transaction.category.slice(1)
            }
          />

          <View style={styles.divider} />

          <DetailRow
            icon="calendar-outline"
            label="Date"
            value={dayjs(transaction.date).format("MMMM DD, YYYY")}
          />

          <View style={styles.divider} />

          <DetailRow
            icon="clock-outline"
            label="Created At"
            value={dayjs(transaction.create_at).format(
              "MMM DD, YYYY · hh:mm A",
            )}
          />

          {transaction.description ? (
            <>
              <View style={styles.divider} />
              <DetailRow
                icon="text-box-outline"
                label="Description"
                value={transaction.description}
              />
            </>
          ) : null}
        </Flexbox>

        {/* Receipts Section */}
        {transaction.receipts && transaction.receipts.length > 0 ? (
          <Flexbox margin={20} marginVertical={10} style={styles.card} gap={8}>
            <Flexbox
              flexDirection="row"
              alignItems="center"
              gap={8}
              padding={16}
              paddingVertical={12}
            >
              <Icon source="receipt" size={20} color={primaryColor} />
              <CustomText
                value="Receipts"
                color={primaryColor}
                fontSize={15}
                fontWeight="700"
              />
            </Flexbox>
            <View style={styles.divider} />
            {transaction.receipts.map((receipt, index) => (
              <Flexbox
                key={index}
                flexDirection="row"
                alignItems="center"
                gap={10}
                padding={16}
                paddingVertical={10}
              >
                <Icon
                  source="file-document-outline"
                  size={18}
                  color={LABEL_COLOR}
                />
                <CustomText
                  value={`Receipt ${index + 1}`}
                  color={LABEL_COLOR}
                  fontSize={14}
                  fontWeight="500"
                />
              </Flexbox>
            ))}
          </Flexbox>
        ) : null}

        {/* Action Buttons */}
        <Flexbox
          padding={20}
          paddingVertical={16}
          gap={12}
          flexDirection="row"
          alignItems="center"
        >
          <Flexbox flex={1}>
            <CustomButton
              mode="outlined"
              icon="pencil-outline"
              onPress={handleEdit}
            >
              Edit
            </CustomButton>
          </Flexbox>

          <Flexbox flex={1}>
            <CustomButton
              mode="contained"
              icon="trash-can-outline"
              loading={deleting}
              disabled={deleting}
              onPress={handleDelete}
              style={{ backgroundColor: EXPENSE_COLOR }}
            >
              Delete
            </CustomButton>
          </Flexbox>
        </Flexbox>
      </ScrollView>
    </SafeAreaLayoutWrapper>
  );
};

/* ── Helper Component ── */
const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <Flexbox
    flexDirection="row"
    alignItems="center"
    gap={14}
    padding={16}
    paddingVertical={14}
  >
    <Icon source={icon} size={22} color={primaryColor} />
    <Flexbox flex={1} gap={2}>
      <CustomText
        value={label}
        color={LABEL_COLOR}
        fontSize={12}
        fontWeight="500"
      />
      <CustomText
        value={value}
        color="#111827"
        fontSize={15}
        fontWeight="600"
      />
    </Flexbox>
  </Flexbox>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  typeBadge: {
    borderRadius: 20,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER_COLOR,
    marginHorizontal: 16,
  },
});

export default TransactionDetailScreen;
