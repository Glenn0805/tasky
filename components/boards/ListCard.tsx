import { List } from "@/types/board.type";
import React from "react";
import ListName from "./ListName";
interface Props {
  list: List;
}
const ListCard = (props: Props) => {
  const { list } = props;
  return (
    <div className="bg-white min-w-72 rounded-xl shadow p-3 min-h-32">
      <ListName list={list} />
    </div>
  );
};

export default ListCard;
