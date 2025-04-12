'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { FC, MouseEvent, PointerEvent, useEffect, useState } from 'react'

interface SignatureDraggableProps {
  id: string
  src: string
  x: number
  y: number
  onDelete: (id: string) => void
}

export const SignatureDraggable: FC<SignatureDraggableProps> = ({ id, src, x, y, onDelete }) => {
  const [position, setPosition] = useState({ x, y })
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      currentPosition: position
    }
  })

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    console.log('Deleting signature with ID:', id)
    onDelete(id)
  }

  useEffect(() => {
    setPosition({ x, y })
  }, [x, y])

  const style = {
    transform: CSS.Translate.toString(transform),
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 1000,
    cursor: transform ? 'grabbing' : 'grab'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='signature-container relative'
    >
      <Image
        src={src}
        alt='Signature'
        className='max-w-xs size-auto'
        draggable='false'
        width={100}
        height={30}
      />
      <button
        onClick={handleDelete}
        className='absolute -top-2 -right-2 bg-red-500 rounded-full p-1 z-[1000]'
        onPointerDown={(e: PointerEvent) => e.stopPropagation()}
      >
        <Trash2Icon className='h-3 w-3 text-white' />
      </button>
    </div>
  )
}
