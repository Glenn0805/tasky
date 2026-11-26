import { getAllCardsByListId } from '@/services/card.service'
import { ListType } from '@/types/board.type'
import React from 'react'
import Card from './Card'
import CardDroppableWrapper from '../dnd/CardDroppableWrapper'
interface Props {
    list: ListType
}
const CardLists = async ({ list }: Props) => {
    const { data: cards } = await getAllCardsByListId(list.id || "")
    return (
        <CardDroppableWrapper droppableId={'list'} className='flex gap-3 min-h-12 flex-col'>
            {cards.map((card, index) => (
                <Card listId={list.id!} index={index} key={card.id} card={card} boardId={list.board_id || ""} />
            ))}
        </CardDroppableWrapper>
    )
}

export default CardLists