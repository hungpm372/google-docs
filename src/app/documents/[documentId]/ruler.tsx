import { cn } from '@/lib/utils'
import React, { FC, useEffect, useRef, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'

const markers = Array.from({ length: 83 }, (_, i) => i)

export const Ruler: FC = () => {
  const [leftMargin, setLeftMargin] = useState<number>(56)
  const [rightMargin, setRightMargin] = useState<number>(56)
  const [isDraggingLeft, setIsDraggingLeft] = useState<boolean>(false)
  const [isDraggingRight, setIsDraggingRight] = useState<boolean>(false)
  const rulerRef = useRef<HTMLDivElement>(null)

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true)
  }

  const handleRightMouseDown = () => {
    setIsDraggingRight(true)
  }

  //   const handleMouseMove = (e: MouseEvent) => {
  //     const PAGE_WIDTH = 816
  //     const MINIMUN_SPACE = 100

  //     if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
  //       const container = rulerRef.current.querySelector('#ruler-container')
  //       if (!container) return

  //       const containerRect = container.getBoundingClientRect()
  //       const relativeX = e.clientX - containerRect.left
  //       const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX))

  //       if (isDraggingLeft) {
  //         const maxLeftPosition = PAGE_WIDTH - rightMargin - MINIMUN_SPACE
  //         const newLeftPosition = Math.min(rawPosition, maxLeftPosition)
  //         setLeftMargin(newLeftPosition)
  //       } else if (isDraggingRight) {
  //         const maxRightPosition = PAGE_WIDTH - leftMargin - MINIMUN_SPACE
  //         const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0)
  //         const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition)
  //         setRightMargin(constrainedRightPosition)
  //       }
  //     }
  //   }

  //   const handleMouseUp = () => {
  //     setIsDraggingLeft(false)
  //     setIsDraggingRight(false)
  //   }

  const handleLeftDoubleClick = () => {
    setLeftMargin(56)
  }

  const handleRightDoubleClick = () => {
    setRightMargin(56)
  }

  useEffect(() => {
    // Add global mouse move and up event listeners when dragging outside the ruler
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      if (isDraggingLeft || isDraggingRight) {
        const container = rulerRef.current?.querySelector('#ruler-container')
        if (!container) return

        const containerRect = (container as Element).getBoundingClientRect()
        const relativeX = e.clientX - containerRect.left
        const PAGE_WIDTH = 816
        const MINIMUN_SPACE = 100
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX))

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MINIMUN_SPACE
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition)
          setLeftMargin(newLeftPosition)
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - leftMargin - MINIMUN_SPACE
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0)
          const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition)
          setRightMargin(constrainedRightPosition)
        }
      }
    }

    const handleGlobalMouseUp = () => {
      if (isDraggingLeft || isDraggingRight) {
        setIsDraggingLeft(false)
        setIsDraggingRight(false)
      }
    }

    if (isDraggingLeft || isDraggingRight) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDraggingLeft, isDraggingRight, leftMargin, rightMargin])

  return (
    <div
      ref={rulerRef}
      //   onMouseMove={handleMouseMove}
      //   onMouseUp={handleMouseUp}
      //   onMouseLeave={handleMouseUp}
      className='w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden'
    >
      <div
        id='ruler-container'
        className={cn(
          'size-full relative',
          (isDraggingLeft || isDraggingRight) && 'cursor-ew-resize'
        )}
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className='absolute inset-x-0 bottom-0 h-full'>
          <div className='relative h-full w-[816px]'>
            {markers.map((marker) => {
              const position = (marker * 816) / 82
              return (
                <div key={marker} className='absolute bottom-0' style={{ left: `${position}px` }}>
                  {marker % 10 === 0 && (
                    <React.Fragment>
                      <div className='absolute bottom-0 w-px h-2 bg-neutral-500' />
                      <span className='absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2'>
                        {marker / 10 + 1}
                      </span>
                    </React.Fragment>
                  )}

                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className='absolute bottom-0 w-px h-1.5 bg-neutral-500' />
                  )}

                  {marker % 5 !== 0 && (
                    <div className='absolute bottom-0 w-px h-1 bg-neutral-500' />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MarkerProps {
  position: number
  isLeft: boolean
  isDragging: boolean
  onMouseDown: () => void
  onDoubleClick: () => void
}

const Marker: FC<MarkerProps> = ({ position, isLeft, isDragging, onMouseDown, onDoubleClick }) => {
  return (
    <div
      className='absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2'
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className='absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2' />
      <div
        className='absolute left-1/2 top-4 transform -translate-x-1/2 transition-opacity duration-150'
        style={{
          height: '100vh',
          width: '1px',
          transform: 'scaleX(0.5)',
          backgroundColor: '#3b72f6',
          display: isDragging ? 'block' : 'none'
        }}
      />
    </div>
  )
}
