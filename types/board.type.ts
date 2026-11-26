import { Database } from "./database.types";

export type BoardType = Partial<Database["public"]["Tables"]["boards"]["Row"]>;

export type ListType = Partial<Database["public"]["Tables"]["list"]["Row"]>;

export type CardType = Partial<Database["public"]["Tables"]["cards"]["Row"]>;

export type ListWithCardsType = ListType & {
  cards: CardType[];
};
