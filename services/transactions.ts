import { supabaseConfig } from "@/config/supabase-config";
import { handleCatchBlockReturn } from "@/helpers";
import { ITransaction } from "@/interfaces";

export const addTransaction = async (payload: Partial<ITransaction>) => {
  try {
    const { data, error } = await supabaseConfig.from("transactions").insert([
      {
        user_id: payload.user_id,
        name: payload.name,
        amount: payload.amount,
        type: payload.type,
        category: payload.category,
        date: payload.date,
        description: payload.description,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Transaction added successfully.",
    };
  } catch (error) {
    return handleCatchBlockReturn(
      error,
      "An error occurred while adding the transaction.",
    );
  }
};

export const editTransactionById = async ({
  transactionId,
  payload,
}: {
  transactionId: number;
  payload: Partial<ITransaction>;
}) => {
  try {
    const { data, error } = await supabaseConfig
      .from("transactions")
      .update({
        name: payload.name,
        amount: payload.amount,
        type: payload.type,
        category: payload.category,
        date: payload.date,
        description: payload.description,
      })
      .eq("id", transactionId);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Transaction updated successfully.",
    };
  } catch (error) {
    return handleCatchBlockReturn(
      error,
      "An error occurred while updating the transaction.",
    );
  }
};

export const deleteTransactionById = async (transactionId: number) => {
  try {
    const { error } = await supabaseConfig
      .from("transactions")
      .delete()
      .eq("id", transactionId);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Transaction deleted successfully.",
    };
  } catch (error) {
    return handleCatchBlockReturn(
      error,
      "An error occurred while deleting the transaction.",
    );
  }
};

export const getTransactionsByUserId = async (userId: number) => {
  try {
    const { data, error } = await supabaseConfig
      .from("transactions")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Transactions fetched successfully.",
      data: data as ITransaction[],
    };
  } catch (error) {
    return handleCatchBlockReturn(
      error,
      "An error occurred while fetching transactions.",
    );
  }
};

export const getTransactionById = async (transactionId: number) => {
  try {
    const { data, error } = await supabaseConfig
      .from("transactions")
      .select("*")
      .eq("id", transactionId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Transaction fetched successfully.",
      data: data as ITransaction,
    };
  } catch (error) {
    return handleCatchBlockReturn(
      error,
      "An error occurred while fetching the transaction.",
    );
  }
};
