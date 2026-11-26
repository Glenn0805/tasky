'use client'
import React, { useEffect, useState } from 'react'
import ListCardDragDropWrapper from '../dnd/ListCardDragDropWrapper'
import { BoardType, CardType, ListType, ListWithCardsType } from '@/types/board.type'
import { Breadcrumbs } from '../tailgrids/core/breadcrumbs'
import BoardName from './BoardName'
import DeleteBoardButton from './DeleteBoardButton'
import ListCardDroppableWrapper from '../dnd/ListCardDroppableWrapper'
import ListCard from './ListCard'
import CreateListButton from './CreateListButton'

interface Props {
    lists: ListType[],
    board: BoardType,
    cardItems: CardType[]
}
const Lists = ({ lists, board, cardItems }: Props) => {
    const [listData, setListData] = useState<ListType[]>(lists || [])
    const [cards, setCards] = useState<Record<string, CardType & { id: string }[]>>(
        () => Object.fromEntries(lists.map((list) => [list.id, cardItems.filter(card => card.list_id === list.id) ?? []])));;

    useEffect(() => {
        setListData(lists);
    }, [lists]);

    useEffect(() => {
        setCards(() => Object.fromEntries(lists.map((list) => [list.id, cardItems.filter(card => card.list_id === list.id) ?? []])));
    }, [cardItems]);

    return (
        <ListCardDragDropWrapper cards={cards} setCards={setCards} lists={listData} setLists={setListData}>
            <div className="flex flex-col h-dvh ">
                <div className="flex justify-between bg-white p-3 items-center shrink-0 sticky top-0">
                    <div>
                        <Breadcrumbs
                            dividerType="chevron"
                            items={[
                                { href: "/boards", label: "Boards" },
                                {
                                    href: `boards/${board.id!}`,
                                    label: board.board_name!,
                                },
                            ]}
                        />
                        <BoardName board={board} />
                    </div>

                    <DeleteBoardButton id={board.id!} />
                </div>
                {/* <ListCardDroppableWrapper droppableId="board" className="flex min-h-0 flex-1 flex-row items-start gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden overflow-y-hidden p-10 w-full"> */}
                <div className="flex min-h-0 flex-1 flex-row items-start gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden overflow-y-hidden p-10 w-full">
                    {listData?.map((list, index) => (
                        <ListCard index={index} key={list.id} list={list} cards={cards} />
                    ))}
                    <CreateListButton boardId={board.id!} />
                </div>
                {/* </ListCardDroppableWrapper> */}
            </div>
        </ListCardDragDropWrapper>
    )
}

export default Lists