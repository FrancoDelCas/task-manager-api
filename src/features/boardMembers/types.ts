export type BoardMemberRole = "admin" | "member";

export type BoardMemberWithProfile = {
  id: string;
  role: BoardMemberRole;
  board_id: string;
  profile: {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
  } | null;
};

