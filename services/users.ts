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
    const email = data.user.email;

    const { data: userData, error: userError } = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    return {
      success: true,
      message: "User logged in successfully.",
      data: userData as IUser,
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

export const getCurrentUserSession = async () => {
  try {
    const session = await supabaseConfig.auth.getSession();
    console.log("🚀 ~ getCurrentUserSession ~ session:", session);
    const sessionData = session.data.session;
    if (!sessionData) {
      return null;
    }
    const email = sessionData.user.email;

    const { data, error } = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as IUser;
  } catch (error) {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabaseConfig.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "User logged out successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while logging out.",
    };
  }
};

export const updateUserProfile = async (payload: Partial<IUser>) => {
  try {
    const { data, error } = await supabaseConfig
      .from("user_profiles")
      .update({
        name: payload.name,
        profile_picture: payload.profile_picture,
      })
      .eq("email", payload.email)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Profile updated successfully.",
      data: data as IUser,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while updating the profile.",
    };
  }
};

export const uploadImageToSupabaseStorage = async (
  fileUri: string,
  fileName: string,
) => {
  try {
    // convert file uri to blob
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const arrayBuffer = await new Response(blob).arrayBuffer();

    const { data, error } = await supabaseConfig.storage
      .from("main") // your bucket name
      .upload(fileName, arrayBuffer, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data: publicUrlData } = supabaseConfig.storage
      .from("main")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;

    // upload to supabase storage
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};
