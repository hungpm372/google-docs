'use client'

import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutation } from 'convex/react'
import { FC, useState } from 'react'
import { BsCloud, BsCloudCheck } from 'react-icons/bs'
import { api } from '../../../../convex/_generated/api'
import { Doc } from '../../../../convex/_generated/dataModel'

interface DocumentInputProps {
  data: Doc<'documents'> | undefined
  isLoading: boolean
}

export const DocumentInput: FC<DocumentInputProps> = ({ data, isLoading }) => {
  const [value, setValue] = useState<string>(data?.title || 'Untitled Document')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  const update = useMutation(api.documents.updateById)

  const handleUpdate = () => {
    if (data && value !== data.title) {
      setIsUpdating(true)
      update({ id: data._id, title: value }).finally(() => {
        setIsUpdating(false)
        setIsEditing(false)
      })
    }
  }

  return (
    <div className='flex items-center gap-2'>
      {!data ? (
        <Skeleton className='w-[150px] h-7' />
      ) : !isEditing ? (
        <span className='text-lg px-1.5 cursor-pointer truncate' onClick={() => setIsEditing(true)}>
          {data.title}
        </span>
      ) : (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleUpdate}
          className='w-[150px] h-7 text-lg px-1.5 focus-visible:ring-0 focus-visible:ring-offset-0'
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpdate()
            }
          }}
          disabled={isUpdating}
          placeholder='Nhập tên tài liệu...'
        />
      )}
      {isLoading ? <BsCloud /> : <BsCloudCheck />}
    </div>
  )
}
