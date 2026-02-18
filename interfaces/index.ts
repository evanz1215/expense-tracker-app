export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  profile_picture?: string;
  create_at: string;
}

export interface ITransaction {
  id: number;
  user_id: number;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  description?: string;
  create_at: string;
}
