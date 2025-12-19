import { supabaseSrv } from "../../db/supabase";
import type { Profile, UpdateProfileInput } from "./types";

export const getProfileById = async (
  profileId: string
): Promise<Profile | null> => {
  try {
    const { data, error } = await supabaseSrv
      .from("profiles")
      .select("id, first_name, last_name, avatar_url, created_at, updated_at, email")
      .eq("id", profileId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    throw {
      message: "Failed to fetch profile",
      statusCode: 500,
      code: "FETCH_PROFILE_ERROR"
    };
  }
};

export const updateProfile = async (
  profileId: string, 
  updates: UpdateProfileInput
): Promise<Profile> => {
  try {
    const { data, error } = await supabaseSrv
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq("id", profileId)
      .select("id, first_name, last_name, avatar_url, created_at, updated_at")
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error updating profile:", error);
    throw {
      message: "Failed to update profile",
      statusCode: 500,
      code: "UPDATE_PROFILE_ERROR"
    };
  }
};