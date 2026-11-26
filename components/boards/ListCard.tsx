import { CardType, ListType, } from "@/types/board.type";
import React from "react";
import ListName from "./ListName";
import CreateCardButton from "./CreateCardButton";
import Card from "./Card";
import ListCardSortableWrapper from "../dnd/ListCardSortableWrapper";
import CardDroppableWrapper from "../dnd/CardDroppableWrapper";
import ListCardDroppableWrapper from "../dnd/ListCardDroppableWrapper";
interface Props {
  list: ListType;
  index: number,
  cards: Record<string, CardType[]>
}
const ListCard = (props: Props) => {
  const { list, index, cards } = props;
  return (
    <ListCardSortableWrapper index={index} sortableId={`board-${list.id!}`} className="bg-gray-50 min-w-72 rounded-xl shadow ">
      <div className="px-3 pt-3 rounded-t-xl">
        <ListName list={list} />
      </div>
      <div className="p-3  flex flex-col gap-3">
        <ListCardDroppableWrapper droppableId={list.id!} className="flex min-h-1.5 flex-col gap-3">
          {cards[list.id!]?.map((card, index) => (
            <Card listId={list.id!} index={card.sort_number!} key={card.id} card={card} boardId={list.board_id || ""} />
          ))}
        </ListCardDroppableWrapper>
        <CreateCardButton list={list} />
      </div>
    </ListCardSortableWrapper>
  );
};

export default ListCard;
