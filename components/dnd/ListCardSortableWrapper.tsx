"use client"
import { useSortable } from '@dnd-kit/react/sortable'
import React from 'react'
import { CollisionPriority } from '@dnd-kit/abstract';
const ListCardSortableWrapper = ({ children, className, sortableId: id, index }: { children: React.ReactNode, className: string, sortableId: string, index: number }) => {
    const { ref } = useSortable({
        id,
        index,
        type: "list-card",
        accept: ["list-card", "card"],
        collisionPriority: CollisionPriority.Low,
    })
    return (
        <div ref={ref} className={className}>{children}</div>
    )
}
export default ListCardSortableWrapper