import { CardType } from '@/types/board.type'
import React from 'react'
import CardName from './CardName'
import CardSortableWrapper from '../dnd/CardSortableWrapper'

interface Props {
    card: CardType,
    boardId: string,
    listId: string,
    index: number
}
const Card = ({ card, boardId, index, listId }: Props) => {
    return (
        <CardSortableWrapper column={card.id!} index={index} sortableId={card.id!} className=' rounded-lg bg-white w-full shadow'>
            <div className='p-3  rounded-t-lg'>
                <CardName card={card} boardId={boardId} />
            </div>
        </CardSortableWrapper>
    )
}

export default Card