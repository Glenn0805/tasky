"use client"
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import React, { Dispatch, SetStateAction, useRef } from 'react'
import { move } from '@dnd-kit/helpers';
import { CardType, ListType } from '@/types/board.type';
import { updateSortNumber } from '@/services/list.service';
import { updateCardSortNumber } from '@/services/card.service';
interface Props {
    lists: ListType[],
    setLists: Dispatch<SetStateAction<ListType[]>>,
    cards: Record<string, CardType & { id: string }[]>,
    setCards: Dispatch<SetStateAction<Record<string, CardType & { id: string }[]>>>
    children: React.ReactNode
}
const ListCardDragDropWrapper = ({ children, lists, setLists, setCards, cards }: Props) => {
    const prevLists = useRef(lists)
    const prevCards = useRef(cards)
    return (
        <DragDropProvider
            // onDragEnd={(event) => {
            //     if (event.canceled) return;
            //     const { source, target } = event.operation;
            //     if (source?.type !== "card" || !target) return;

            //     let toListId: string | undefined;

            //     if (target.type === "card-wrapper") {
            //         // dropped on a list's card area (empty or not)
            //         toListId = String(target.id).replace(/-card$/, "");
            //     } else if (isSortable(target)) {
            //         // dropped on another card
            //         toListId = target.group as string;
            //     }

            //     if (!toListId) return;
            //     console.log("move card", source.id, "to list", toListId);
            //     // call your server action here to change the card's list
            // }}
            onDragStart={() => {
                prevCards.current = cards;
                prevLists.current = lists;
            }}
            onDragEnd={async (event) => {
                if (event.canceled) return;
                const { target, source } = event.operation;
                if (!isSortable(source)) return;

                if (event.canceled) {
                    if (source.type === 'item') {
                        setCards(prevCards.current);
                    }

                    return;
                }
                if (event.canceled || source.type !== 'list-card') return;

                let next = move(lists.map((list) => ({ ...list, id: list.id! })), event)
                const updatedList: ListType[] = next
                    .map((list, index) => {
                        return {
                            ...list,
                            sort_number: index + 1,
                        }
                    })
                const changed = updatedList
                    .filter((list, index) => list.id !== prevLists.current[index]?.id)
                setLists(updatedList)
                console.log(prevLists.current, updatedList)
                if (changed.length)
                    await updateSortNumber(changed)
                // prevLists.current = updatedList

            }}
            onDragOver={async (event) => {
                const { source, target, } = event.operation;
                if (source?.type === 'list-card') return;
                let next = move(cards, event)
                let prev: CardType[] = []
                let current: CardType[] = []
                for (const listId in next) {
                    const card: CardType[] = next[listId]
                    const updatedCard = card.map((c, index) => {
                        return {
                            ...c,
                            list_id: listId,
                            sort_number: index + 1,
                            id: c.id!
                        }
                    })
                    next[listId] = updatedCard
                    prev = [...prev, ...prevCards.current[listId]]
                    current = [...current, ...next[listId]]
                    //    const changed = current.filter(({})=> card?.)
                }

                const changed = current
                    .filter((card) => {
                        const prevCard = prev.find((c) => c.id == card.id)
                        return prevCard?.list_id !== card.list_id || card.sort_number !== prevCard?.sort_number
                    })
                setCards(next);
                if (changed.length > 0) {
                    await updateCardSortNumber(changed, lists[0].board_id!)
                }
                // prevCards.current = next

            }}

        >
            {children}
        </DragDropProvider>
    )
}

export default ListCardDragDropWrapper