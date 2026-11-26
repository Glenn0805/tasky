'use client'
import { useDroppable } from '@dnd-kit/react';
import React from 'react'
import { CollisionPriority } from '@dnd-kit/abstract';

const CardDroppableWrapper = ({ children, className, droppableId }: { children: React.ReactNode, className?: string, droppableId: string }) => {
    const { ref } = useDroppable({
        id: droppableId,
        type: 'card-wrapper',
        accept: 'card',
        collisionPriority: CollisionPriority.Low,
    });
    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}

export default CardDroppableWrapper