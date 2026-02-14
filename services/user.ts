import { supabaseConfig } from "@/config/supabase-config";
import { IUser } from "@/interfaces";

export const registerNewUser = async (payload: Partial<IUser>) => {
  try {
    // insert data to supabase auth
    const { data, error } = await supabaseConfig.auth.signUp({
      email: payload.email!,
      password: payload.name!,
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
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while registering the user.",
    };
  }
};
