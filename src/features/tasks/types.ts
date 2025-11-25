export interface Task {
    id: string;
    board_id: string;
    title: string;
    description: string;
    status: string; // todo | in progress | done
    created_at: string;
    created_by: string;
    edited_at?: string | null;
    edited_by?: string | null;
  }