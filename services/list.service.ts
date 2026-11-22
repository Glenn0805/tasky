"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { List } from "@/types/board.type";
import { getCurrentUser } from "./board.service";
import { revalidatePath } from "next/cache";

export const createList = async (list: List) => {
  const supabase = await createSupabaseServerClient();
  const currentUser = await getCurrentUser();
  const { data, error } = await supabase
    .from("list")
    .insert({
      ...list,
      created_by: currentUser?.id,
    })
    .select("id")
    .single();
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(`/boards/${data.id}`);
};

export const getListsByBoardId = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, count, error } = await supabase
    .from("list")
    .select("*")
    .eq("board_id", id);

  return { data, count, error };
};

export const updateList = async (list: List) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("list")
    .update({
      ...list,
    })
    .eq("id", list.id!);

  revalidatePath(`/boards/${list.board_id}`);
  if (error) {
    throw new Error(error.message);
  }
};
