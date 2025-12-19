import { supabaseSrv } from "../../db/supabase";
import type { BoardMemberWithProfile, BoardMemberRole } from "./types";

export const getBoardMembers = async (boardId: string): Promise<BoardMemberWithProfile[]> => {
  const { data, error } = await supabaseSrv
    .from("board_members")
    .select(`
      board_id,
      role,
      user_id,
      profiles (
        id,
        email,
        first_name,
        last_name
      )
    `)
    .eq("board_id", boardId);

  if (error) throw new Error(error.message);
  return (
    data?.map((m: any) => ({
      id: m.user_id,            
      role: m.role,
      board_id: m.board_id,
      profile: m.profiles ? {
        id: m.profiles.id,
        email: m.profiles.email,
        first_name: m.profiles.first_name,
        last_name: m.profiles.last_name,
      } : null,
    })) ?? []
  );
};

export const getUserRoleInBoard = async (boardId: string, userId: string): Promise<BoardMemberRole> => {
  const { data, error } = await supabaseSrv
    .from("board_members")
    .select("role")
    .eq("board_id", boardId)
    .eq("user_id", userId)
    .single();
    
    console.log("getUserRoleInBoard data: ", data)
    
  if (error) throw new Error(error.message);
  return data.role as BoardMemberRole;
};

export const isBoardMember = async (boardId: string, userId: string): Promise<boolean> => {
  const { data, error } = await supabaseSrv
    .from("board_members")
    .select("user_id")
    .eq("board_id", boardId)
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return !!data;
};

export const addBoardMember = async (boardId: string, new_member: string, role: BoardMemberRole = "member"): Promise<void> => {
  const { error } = await supabaseSrv
    .from("board_members")
    .insert({ board_id: boardId, user_id: new_member, role });

  if (error) throw new Error(error.message);
};

export const removeBoardMember = async (boardId: string, userId: string): Promise<void> => {
  const { error } = await supabaseSrv
    .from("board_members")
    .delete()
    .eq("board_id", boardId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
};