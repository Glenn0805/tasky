"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ListType, ListWithCardsType } from "@/types/board.type";
import { getCurrentUser } from "./board.service";
import { revalidatePath } from "next/cache";

export const createList = async (list: ListType) => {
  const supabase = await createSupabaseServerClient();
  const currentUser = await getCurrentUser();
  const { data: lastRow } = await supabase
    .from("list")
    .select("sort_number")
    .eq("board_id", list.board_id!)
    .single();
  const { data, error } = await supabase
    .from("list")
    .insert({
      ...list,
      sort_number: Number(lastRow?.sort_number || 0) + 1,
      created_by: currentUser?.id,
    })
    .select("board_id")
    .single();
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(`/boards/${data.board_id}`);
};

export const getListsByBoardId = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, count, error } = await supabase
    .from("list")
    .select("*")
    .eq("board_id", id)
    .order("sort_number");
  if (error) {
    throw new Error(error.message);
  }
  return { data, count, error };
};

export const getListsWithCardsByBoardId = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const { data: lists, error } = await supabase
    .from("list")
    .select("*")
    .eq("board_id", id)
    .order("sort_number");
  if (error) {
    throw new Error(error.message);
  }

  const listIds = lists.map((l) => l.id);

  const { data: cards, error: cardError } = await supabase
    .from("cards")
    .select("*")
    .in("list_id", listIds)
    .order("sort_number");

  if (cardError) {
    throw new Error(cardError.message);
  }

  const listsWithCards: ListWithCardsType[] = lists.map((list) => ({
    ...list,
    cards: (cards ?? []).filter((card) => card.list_id === list.id),
  }));

  return { listsWithCards, cards, lists };
};

export const updateList = async (list: ListType) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("list")
    .update({
      ...list,
    })
    .eq("id", list.id!);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(`/boards/${list.board_id}`);
};

export const updateSortNumber = async (lists: ListType[]) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("list")
    .upsert(lists, { onConflict: "id" });
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(`/boards/${lists[0].id}`);
};
