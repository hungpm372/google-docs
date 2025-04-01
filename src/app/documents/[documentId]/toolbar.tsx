'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon
} from 'lucide-react'
import { FC } from 'react'

const FontFamilyButton = () => {
  const { editor } = useEditorStore()
  const fonts = [
    {
      label: 'Arial',
      value: 'Arial'
    },
    {
      label: 'Helvetica',
      value: 'Helvetica, sans-serif'
    },
    {
      label: 'Times New Roman',
      value: 'Times New Roman, serif'
    },
    {
      label: 'Courier New',
      value: 'Courier New, monospace'
    },
    {
      label: 'Georgia',
      value: 'Georgia, serif'
    },
    {
      label: 'Verdana',
      value: 'Verdana, sans-serif'
    },
    {
      label: 'Tahoma',
      value: 'Tahoma, sans-serif'
    },
    {
      label: 'Trebuchet MS',
      value: 'Trebuchet MS, sans-serif'
    },
    {
      label: 'Impact',
      value: 'Impact, sans-serif'
    },
    {
      label: 'Comic Sans MS',
      value: 'Comic Sans MS, cursive'
    },
    {
      label: 'Palatino',
      value: 'Palatino, serif'
    },
    {
      label: 'Garamond',
      value: 'Garamond, serif'
    },
    {
      label: 'Bookman',
      value: 'Bookman, serif'
    },
    {
      label: 'Avant Garde',
      value: 'Avant Garde, sans-serif'
    },
    {
      label: 'Lucida Grande',
      value: 'Lucida Grande, sans-serif'
    },
    {
      label: 'Roboto',
      value: '"Roboto", sans-serif'
    },
    {
      label: 'Open Sans',
      value: '"Open Sans", sans-serif'
    },
    {
      label: 'Lato',
      value: '"Lato", sans-serif'
    },
    {
      label: 'Montserrat',
      value: '"Montserrat", sans-serif'
    },
    {
      label: 'Raleway',
      value: '"Raleway", sans-serif'
    },
    {
      label: 'Oswald',
      value: '"Oswald", sans-serif'
    },
    {
      label: 'Merriweather',
      value: '"Merriweather", serif'
    },
    {
      label: 'Poppins',
      value: '"Poppins", sans-serif'
    },
    {
      label: 'Source Sans Pro',
      value: '"Source Sans Pro", sans-serif'
    },
    {
      label: 'Ubuntu',
      value: '"Ubuntu", sans-serif'
    },
    {
      label: 'Playfair Display',
      value: '"Playfair Display", serif'
    },
    {
      label: 'Nunito',
      value: '"Nunito", sans-serif'
    },
    {
      label: 'Quicksand',
      value: '"Quicksand", sans-serif'
    },
    {
      label: 'PT Sans',
      value: '"PT Sans", sans-serif'
    },
    {
      label: 'PT Serif',
      value: '"PT Serif", serif'
    },
    {
      label: 'Rubik',
      value: '"Rubik", sans-serif'
    },
    {
      label: 'Work Sans',
      value: '"Work Sans", sans-serif'
    },
    {
      label: 'Fira Sans',
      value: '"Fira Sans", sans-serif'
    },
    {
      label: 'Noto Sans',
      value: '"Noto Sans", sans-serif'
    },
    {
      label: 'Noto Serif',
      value: '"Noto Serif", serif'
    },
    {
      label: 'Crimson Text',
      value: '"Crimson Text", serif'
    },
    {
      label: 'Mukta',
      value: '"Mukta", sans-serif'
    },
    {
      label: 'IBM Plex Sans',
      value: '"IBM Plex Sans", sans-serif'
    },
    {
      label: 'IBM Plex Serif',
      value: '"IBM Plex Serif", serif'
    },
    {
      label: 'IBM Plex Mono',
      value: '"IBM Plex Mono", monospace'
    },
    {
      label: 'Dancing Script',
      value: '"Dancing Script", cursive'
    },
    {
      label: 'Pacifico',
      value: '"Pacifico", cursive'
    },
    {
      label: 'Shadows Into Light',
      value: '"Shadows Into Light", cursive'
    },
    {
      label: 'Lobster',
      value: '"Lobster", cursive'
    },
    {
      label: 'Inconsolata',
      value: '"Inconsolata", monospace'
    },
    {
      label: 'Source Code Pro',
      value: '"Source Code Pro", monospace'
    },
    {
      label: 'Fira Code',
      value: '"Fira Code", monospace'
    },
    {
      label: 'JetBrains Mono',
      value: '"JetBrains Mono", monospace'
    },
    {
      label: 'Arimo',
      value: '"Arimo", sans-serif'
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'h-7 w-[120px] shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
          )}
        >
          <span className='truncate'>
            {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
          </span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            type='button'
            aria-label={label}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80'
            )}
            style={{ fontFamily: value }}
          >
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ToolbarButtonProps {
  icon: LucideIcon
  isActive?: boolean
  onClick?: () => void
}

const ToolbarButton: FC<ToolbarButtonProps> = ({ onClick, isActive, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className='size-4' />
    </button>
  )
}

export const Toolbar: FC = () => {
  const { editor } = useEditorStore()
  console.log(editor)

  const sections: {
    label: string
    icon: LucideIcon
    isActive?: boolean
    onClick: () => void
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run()
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run()
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print()
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck')
          editor?.view.dom.setAttribute('spellcheck', current === 'true' ? 'false' : 'true')
        }
      }
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run()
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run()
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        onClick: () => editor?.chain().focus().toggleUnderline().run()
      }
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquarePlusIcon,
        isActive: false,
        onClick: () => console.log('Comment clicked')
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        isActive: editor?.isActive('taskList'),
        onClick: () => editor?.chain().focus().toggleTaskList().run()
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run()
      }
    ]
  ]

  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  )
}
