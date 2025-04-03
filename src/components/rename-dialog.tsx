'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { useMutation } from 'convex/react'
import { FC, FormEvent, useState } from 'react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface RenameDialogProps {
  documentId: Id<'documents'>
  initialTitle: string
  children: React.ReactNode
}

export const RenameDialog: FC<RenameDialogProps> = ({ documentId, initialTitle, children }) => {
  const update = useMutation(api.documents.updateById)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(initialTitle)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdating(true)

    update({ id: documentId, title: title.trim() || 'Untitled Document' }).finally(() => {
      setIsUpdating(false)
      setIsOpen(false)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>Enter a new name for your document.</DialogDescription>
          </DialogHeader>
          <div className='my-4'>
            <Input
              type='text'
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Document name'
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='ghost'
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
