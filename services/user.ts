import { supabaseConfig } from "@/config/supabase-config";
import { IUser } from "@/interfaces";

export const registerNewUser = async (payload: Partial<IUser>) => {
  try {
    // insert data to supabase auth
    const { data, error } = await supabaseConfig.auth.signUp({
      email: payload.email!,
      password: payload.password!,
    });

    console.log("🚀 ~ registerNewUser ~ data:", data);

    if (error) {
      throw new Error(error.message);
    }

    // insert data to supabase user_profiles table
    const { data: profileData, error: profileError } = await supabaseConfig
      .from("user_profiles")
      .insert([
        {
          name: payload.name,
          email: payload.email,
        },
      ]);
    console.log("🚀 ~ registerNewUser ~ profileData:", profileData);

    if (profileError) {
      throw new Error(profileError.message);
    }

    return {
      success: true,
      message: "User registered successfully.",
    };
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while registering the user.",
    };
  }
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const { data, error } = await supabaseConfig.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    console.log("🚀 ~ loginUser ~ data:", data);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "User logged in successfully.",
      data,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;

    // return {
    //   success: false,
    //   message:
    //     error instanceof Error
    //       ? error.message
    //       : "An error occurred while logging in the user.",
    // };
  }
};
