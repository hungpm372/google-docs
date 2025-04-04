'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from '@/components/ui/menubar'
import { useEditorStore } from '@/store/use-editor-store'
import { UserButton } from '@clerk/nextjs'
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { BsFilePdf } from 'react-icons/bs'
import { Doc } from '../../../../convex/_generated/dataModel'
import { DocumentInput } from './document-input'

interface NavbarProps {
  data: Doc<'documents'> | undefined
  isLoading: boolean
}

export const Navbar: FC<NavbarProps> = ({ data, isLoading }) => {
  const { editor } = useEditorStore()

  const handleInsertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run()
  }

  const handleDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSaveJSON = () => {
    if (!editor) return
    const content = editor.getJSON()
    const blob = new Blob([JSON.stringify(content)], { type: 'application/json' })
    handleDownload(blob, 'document.json')
  }

  const handleSaveHTML = () => {
    if (!editor) return
    const content = editor.getHTML()
    const blob = new Blob([content], { type: 'text/html' })
    handleDownload(blob, 'document.html')
  }

  const handleSavePDF = () => {
    window.print()
  }

  const handleSaveText = () => {
    if (!editor) return
    const content = editor.getText()
    const blob = new Blob([content], { type: 'text/plain' })
    handleDownload(blob, 'document.txt')
  }

  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            alt='Google Docs'
            width={36}
            height={36}
            priority
            className='size-9'
          />
        </Link>
        <div className='flex flex-col'>
          <DocumentInput data={data} isLoading={isLoading} />
          <div className='flex'>
            <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  File
                </MenubarTrigger>
                <MenubarContent className='print:hidden'>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className='size-4 mr-2' />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={handleSaveJSON}>
                        <FileJsonIcon className='size-4 mr-2' />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={handleSaveHTML}>
                        <GlobeIcon className='size-4 mr-2' />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={handleSavePDF}>
                        <BsFilePdf className='size-4 mr-2' />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={handleSaveText}>
                        <FileTextIcon className='size-4 mr-2' />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlusIcon className='size-4 mr-2' />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className='size-4 mr-2' />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className='size-4 mr-2' />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className='size-4 mr-2' />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                    <Undo2Icon className='size-4 mr-2' />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                    <Redo2Icon className='size-4 mr-2' />
                    Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => handleInsertTable({ rows: 1, cols: 1 })}>
                        1 x 1
                      </MenubarItem>
                      <MenubarItem onClick={() => handleInsertTable({ rows: 2, cols: 2 })}>
                        2 x 2
                      </MenubarItem>
                      <MenubarItem onClick={() => handleInsertTable({ rows: 3, cols: 3 })}>
                        3 x 3
                      </MenubarItem>
                      <MenubarItem onClick={() => handleInsertTable({ rows: 4, cols: 4 })}>
                        4 x 4
                      </MenubarItem>
                      <MenubarItem onClick={() => handleInsertTable({ rows: 5, cols: 5 })}>
                        5 x 5
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className='size-4 mr-2' />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                        <BoldIcon className='size-4 mr-2' />
                        Bold <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                        <ItalicIcon className='size-4 mr-2' />
                        Italic <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                        <UnderlineIcon className='size-4 mr-2' />
                        Underline <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                        <StrikethroughIcon className='size-4 mr-2' />
                        Strikethrough <MenubarShortcut>⌘D</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                    <RemoveFormattingIcon className='size-4 mr-2' />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <UserButton />
    </nav>
  )
}
