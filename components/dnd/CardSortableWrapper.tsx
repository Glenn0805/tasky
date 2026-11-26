"use client"
import { useSortable } from '@dnd-kit/react/sortable'
import React from 'react'

const CardSortableWrapper = ({ children, className, sortableId: id, index, column }: { children: React.ReactNode, className: string, sortableId: string, index: number, column: string }) => {
  const { ref } = useSortable({
    id,
    index,
    type: 'card',
    accept: 'card',
    group: column
  })
  return (
    <div ref={ref} className={className}>{children}</div>
  )
}
export default CardSortableWrapper