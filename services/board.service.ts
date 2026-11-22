"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Board } from "@/types/board.type";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  return userData.user;
}

export const getBoardsByCurrentUser = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { data: null, count: 0, error: new Error("User not authenticated") };
  }
  const supabase = await createSupabaseServerClient();
  const { data, count, error } = await supabase
    .from("boards")
    .select("*")
    .eq("created_by", currentUser?.id);

  return { data, count, error };
};

export const getBoardById = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, count, error } = await supabase
    .from("boards")
    .select("*")
    .eq("id", id)
    .single();

  return { data, count, error };
};

export const createBoard = async (formData: FormData) => {
  const supabase = await createSupabaseServerClient();
  const currentUser = await getCurrentUser();
  const boardName = formData.get("board_name");
  if (!boardName) return;
  const { data, error } = await supabase
    .from("boards")
    .insert({
      board_name: String(boardName),
      created_by: currentUser?.id,
    })
    .select("id")
    .single();
  if (error) {
    throw new Error(error.message);
  }
  redirect(`/boards/${data.id}`);
};

export const deleteBoardById = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("boards").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  const { error: listError } = await supabase
    .from("list")
    .delete()
    .eq("board_id", id);

  if (listError) {
    throw new Error(listError.message);
  }
  redirect("/boards");
};

export const updateBoard = async (board: Board) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("boards")
    .update({
      ...board,
    })
    .eq("id", board.id!);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/boards/${board.id}`);
};
