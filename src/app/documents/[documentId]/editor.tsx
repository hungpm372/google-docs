'use client'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { Separator } from '@/components/ui/separator'
import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'
import { useEditorStore } from '@/store/use-editor-store'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { FC } from 'react'
import { AiOutlineMergeCells, AiOutlineSplitCells } from 'react-icons/ai'
import ImageResize from 'tiptap-extension-resize-image'
import { Ruler } from './ruler'

interface EditorProps {
  onChange: () => void
  initialContent?: string
}

export const Editor: FC<EditorProps> = ({ initialContent, onChange }) => {
  const { setEditor } = useEditorStore()
  const editor = useEditor({
    onCreate(props) {
      setEditor(props.editor)
    },
    onDestroy() {
      setEditor(null)
    },
    onUpdate(props) {
      setEditor(props.editor)
      onChange()
    },
    // onSelectionUpdate(props) {
    //   setEditor(props.editor)
    // },
    // onTransaction(props) {
    //   setEditor(props.editor)
    // },
    // onFocus(props) {
    //   setEditor(props.editor)
    // },
    // onBlur(props) {
    //   setEditor(props.editor)
    // },
    // onContentError(props) {
    //   setEditor(props.editor)
    // },
    editorProps: {
      attributes: {
        id: 'tiptap',
        style: 'padding-left: 56px; padding-right: 56px;',
        class:
          'focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text'
      }
    },
    immediatelyRender: false,
    autofocus: true,
    content: initialContent,
    extensions: [
      StarterKit,
      LineHeightExtension.configure({
        types: ['heading', 'paragraph'],
        defaultLineHeight: 'normal'
      }),
      FontSizeExtension,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https'
      }),
      Color,
      Highlight.configure({
        multicolor: true
      }),
      FontFamily,
      TextStyle,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'draggable-image',
          draggable: 'true'
        }
      }),
      ImageResize,
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true
      })
    ]
  })

  return (
    <div className='w-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <Ruler />
      <ContextMenu>
        <ContextMenuTrigger>
          <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
            <EditorContent editor={editor} />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-[300px] py-2' onContextMenu={(e) => e.preventDefault()}>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <PlusIcon className='mr-2 size-4' /> Chèn bảng
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className='w-[200px] py-2'>
              {Array.from({ length: 5 }, (_, i) => (
                <ContextMenuItem
                  key={i}
                  onClick={() =>
                    editor
                      ?.chain()
                      .focus()
                      .insertTable({ rows: i + 1, cols: i + 1, withHeaderRow: false })
                      .run()
                  }
                  disabled={!editor?.can().insertTable({ rows: i + 1, cols: i + 1 })}
                >
                  <PlusIcon className='mr-2 size-4' />
                  {i + 1} x {i + 1}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <Separator className='my-2' />
          <ContextMenuItem
            onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
            disabled={!editor?.can().toggleHeaderRow()}
          >
            <PlusIcon className='mr-2 size-4' /> Chèn hàng tiêu đề
          </ContextMenuItem>
          <Separator className='my-2' />
          <ContextMenuItem
            onClick={() => editor?.chain().focus().addRowBefore().run()}
            disabled={!editor?.can().addRowBefore()}
          >
            <PlusIcon className='mr-2 size-4' /> Chèn hàng bên trên
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor?.chain().focus().addRowAfter().run()}
            disabled={!editor?.can().addRowAfter()}
          >
            <PlusIcon className='mr-2 size-4' /> Chèn hàng bên dưới
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor?.chain().focus().addColumnBefore().run()}
            disabled={!editor?.can().addColumnBefore()}
          >
            <PlusIcon className='mr-2 size-4' /> Chèn cột vào bên trái
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor?.chain().focus().addColumnAfter().run()}
            disabled={!editor?.can().addColumnAfter()}
          >
            <PlusIcon className='mr-2 size-4' /> Chèn cột vào bên phải
          </ContextMenuItem>
          <Separator />
          <ContextMenuItem
            onClick={() => editor?.chain().focus().deleteRow().run()}
            disabled={!editor?.can().deleteRow()}
          >
            <Trash2Icon className='mr-2 size-4' /> Xóa hàng
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor?.chain().focus().deleteColumn().run()}
            disabled={!editor?.can().deleteColumn()}
          >
            <Trash2Icon className='mr-2 size-4' /> Xóa cột
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor?.chain().focus().deleteTable().run()}
            disabled={!editor?.can().deleteTable()}
          >
            <Trash2Icon className='mr-2 size-4' /> Xóa bảng
          </ContextMenuItem>
          <Separator />
          <ContextMenuItem
            onClick={() => editor?.chain().focus().mergeCells().run()}
            disabled={!editor?.can().mergeCells()}
          >
            <AiOutlineMergeCells className='mr-2 size-4' /> Hợp nhất ô
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor?.chain().focus().splitCell().run()}
            disabled={!editor?.can().splitCell()}
          >
            <AiOutlineSplitCells className='mr-2 size-4' /> Chia ô
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
