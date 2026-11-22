import { Database } from "./database.types";

export type Board = Partial<Database["public"]["Tables"]["boards"]["Row"]>;

export type List = Partial<Database["public"]["Tables"]["list"]["Row"]>;
