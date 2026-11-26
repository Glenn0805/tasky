"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CardType } from "@/types/board.type";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./board.service";

export const getAllCardsByListId = async (listId: string) => {
  if (!listId) {
    throw new Error("Failed to get Cards: ListId is required");
  }
  const supabase = await createSupabaseServerClient();
  const { data, count, error } = await supabase
    .from("cards")
    .select("*")
    .eq("list_id", listId);

  if (error) {
    throw new Error(error.message);
  }

  return { data, count, error };
};

export const createCard = async (card: CardType, boardId: string) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("cards").insert({
    ...card,
  });
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(`/boards/${boardId}`);
};

export const updateCard = async (card: CardType, boardId: string) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("cards")
    .update({
      ...card,
    })
    .eq("id", card.id!);

  revalidatePath(`/boards/${boardId}`);
  if (error) {
    throw new Error(error.message);
  }
};

export const updateCardSortNumber = async (
  cards: CardType[],
  boardId: string,
) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("cards")
    .upsert(cards, { onConflict: "id" });
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(`/boards/${boardId}`);
};
