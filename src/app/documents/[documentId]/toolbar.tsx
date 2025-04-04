'use client'

// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle
// } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
// import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { type Level } from '@tiptap/extension-heading'
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  // HighlighterIcon,
  // ImageIcon,
  ItalicIcon,
  // Link2Icon,
  // ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  // PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  // SearchIcon,
  // SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon
  // UploadIcon
} from 'lucide-react'
import React, { FC, useState } from 'react'
// import { type ColorResult, SketchPicker } from 'react-color'

// const LineHeightButton = () => {
//   const { editor } = useEditorStore()

//   const lineHeights = [
//     { label: 'Default', value: 'Normal' },
//     { label: 'Single', value: '1' },
//     { label: '1.15', value: '1.15' },
//     { label: '1.5', value: '1.5' },
//     { label: 'Double', value: '2' },
//     { label: '2.5', value: '2.5' },
//     { label: '3', value: '3' }
//   ]

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
//           <ListCollapseIcon className='size-4' />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
//         {lineHeights.map(({ label, value }) => (
//           <button
//             key={value}
//             onClick={() => editor?.chain().focus().setLineHeight(value).run()}
//             type='button'
//             aria-label={label}
//             className={cn(
//               'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
//               editor?.getAttributes('paragraph').lineHeight === value && 'bg-neutral-200/80'
//             )}
//           >
//             <span className='text-sm'>{label}</span>
//           </button>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

const FontSizeButton = () => {
  const { editor } = useEditorStore()

  const currentFontSize = editor?.getAttributes('textStyle').fontSize
    ? editor.getAttributes('textStyle').fontSize.replace('px', '')
    : '16'

  const [fontSize, setFontSize] = useState<string>(currentFontSize)
  const [inputValue, setInputValue] = useState<string>(fontSize)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize)
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run()
      setFontSize(newSize)
      setInputValue(newSize)
      setIsEditing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    updateFontSize(inputValue)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      updateFontSize(inputValue)
      editor?.commands.focus()
    }
  }

  const incrementFontSize = () => {
    const newSize = parseInt(fontSize) + 1
    updateFontSize(newSize.toString())
  }

  const decrementFontSize = () => {
    const newSize = parseInt(fontSize) - 1
    if (newSize > 0) {
      updateFontSize(newSize.toString())
    }
  }

  return (
    <div className='flex items-center gap-x-0.5'>
      <button
        onClick={decrementFontSize}
        className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'
      >
        <MinusIcon className='size-4' />
      </button>
      {isEditing ? (
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className='h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0'
          autoFocus
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true)
            setFontSize(currentFontSize)
          }}
          className='h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text'
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={incrementFontSize}
        className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'
      >
        <PlusIcon className='size-4' />
      </button>
    </div>
  )
}

const ListButton = () => {
  const { editor } = useEditorStore()

  const lists = [
    {
      label: 'Bullet List',
      icon: ListIcon,
      isActive: () => editor?.isActive('bulletList'),
      onClick: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
      label: 'Ordered List',
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive('orderedList'),
      onClick: () => editor?.chain().focus().toggleOrderedList().run()
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <ListIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {lists.map(({ label, icon: Icon, isActive, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            type='button'
            aria-label={label}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              isActive() && 'bg-neutral-200/80'
            )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const AlignButton = () => {
  const { editor } = useEditorStore()

  const alignments = [
    {
      label: 'Align Left',
      value: 'left',
      icon: AlignLeftIcon
    },
    {
      label: 'Align Center',
      value: 'center',
      icon: AlignCenterIcon
    },
    {
      label: 'Align Right',
      value: 'right',
      icon: AlignRightIcon
    },
    {
      label: 'Align Justify',
      value: 'justify',
      icon: AlignJustifyIcon
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <AlignLeftIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            type='button'
            aria-label={label}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
            )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// const ImageButton = () => {
//   const { editor } = useEditorStore()
//   const [imageUrl, setImageUrl] = useState<string>('')
//   const [isOpen, setIsOpen] = useState<boolean>(false)

//   const handleChange = (src: string) => {
//     editor?.chain().focus().setImage({ src }).run()
//   }

//   const handleUpload = () => {
//     const input = document.createElement('input')
//     input.type = 'file'
//     input.accept = 'image/*'
//     input.onchange = async (event) => {
//       const file = (event.target as HTMLInputElement).files?.[0]
//       if (file) {
//         const imageUrl = URL.createObjectURL(file)
//         handleChange(imageUrl)
//       }
//     }
//     input.click()
//   }

//   const handleImageUrlSubmit = () => {
//     if (imageUrl) {
//       handleChange(imageUrl)
//       setImageUrl('')
//       setIsOpen(false)
//     }
//   }

//   return (
//     <React.Fragment>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
//             <ImageIcon className='size-4' />
//           </button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <DropdownMenuItem onClick={handleUpload}>
//             <UploadIcon className='size-4 mr-2' />
//             Upload
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => setIsOpen(true)}>
//             <SearchIcon className='size-4 mr-2' />
//             Paste image URL
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Insert image URL</DialogTitle>
//           </DialogHeader>
//           <Input
//             placeholder='Insert image URL'
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleImageUrlSubmit()
//               }
//             }}
//           />
//           <DialogFooter>
//             <Button onClick={handleImageUrlSubmit}>Insert</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </React.Fragment>
//   )
// }

// const LinkButton = () => {
//   const { editor } = useEditorStore()
//   const [value, setValue] = useState<string>('')

//   const handleChange = (href: string) => {
//     editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
//     setValue('')
//   }

//   return (
//     <DropdownMenu
//       onOpenChange={(open) => {
//         if (open) {
//           setValue(editor?.getAttributes('link').href || '')
//         }
//       }}
//     >
//       <DropdownMenuTrigger asChild>
//         <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
//           <Link2Icon className='size-4' />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
//         <Input
//           placeholder='https://example.com'
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />
//         <Button onClick={() => handleChange(value)}>Apply</Button>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

// const HighlightColorButton = () => {
//   const { editor } = useEditorStore()

//   const currentColor = editor?.getAttributes('highlight').color || '#ffffff'

//   const handleColorChange = (color: ColorResult) => {
//     editor?.chain().focus().setHighlight({ color: color.hex }).run()
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
//           <HighlighterIcon className='size-4' />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className='p-0'>
//         <SketchPicker color={currentColor} onChange={handleColorChange} />
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

// const TextColorButton = () => {
//   const { editor } = useEditorStore()

//   const currentColor = editor?.getAttributes('textStyle').color || '#000000'

//   const handleColorChange = (color: ColorResult) => {
//     editor?.chain().focus().setColor(color.hex).run()
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
//           <span className='text-xs'>A</span>
//           <div className='h-0.5 w-full' style={{ backgroundColor: currentColor }} />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className='p-0'>
//         <SketchPicker color={currentColor} onChange={handleColorChange} />
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

const HeadingLevelButton = () => {
  const { editor } = useEditorStore()

  const headings = [
    {
      label: 'Normal Text',
      value: 0,
      fontSize: '16px'
    },
    {
      label: 'Heading 1',
      value: 1,
      fontSize: '32px'
    },
    {
      label: 'Heading 2',
      value: 2,
      fontSize: '24px'
    },
    {
      label: 'Heading 3',
      value: 3,
      fontSize: '20px'
    },
    {
      label: 'Heading 4',
      value: 4,
      fontSize: '18px'
    },
    {
      label: 'Heading 5',
      value: 5,
      fontSize: '16px'
    }
  ]

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive(`heading`, { level })) {
        return `Heading ${level}`
      }
    }
    return 'Normal Text'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
          )}
        >
          <span className='truncate'>{getCurrentHeading()}</span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run()
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run()
              }
            }}
            type='button'
            aria-label={label}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              (value === 0 && !editor?.isActive('heading')) ||
                (editor?.isActive('heading', { level: value }) && 'bg-neutral-200/80')
            )}
            style={{ fontSize }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
            'h-7 w-[150px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
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
      }
      // {
      //   label: 'Print',
      //   icon: PrinterIcon,
      //   onClick: () => window.print()
      // }
      // {
      //   label: 'Spell Check',
      //   icon: SpellCheckIcon,
      //   onClick: () => {
      //     const current = editor?.view.dom.getAttribute('spellcheck')
      //     editor?.view.dom.setAttribute('spellcheck', current === 'true' ? 'false' : 'true')
      //   }
      // }
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
      <HeadingLevelButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <FontSizeButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* <TextColorButton /> */}
      {/* <HighlightColorButton /> */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* <LinkButton /> */}
      {/* <ImageButton /> */}
      <AlignButton />
      {/* <LineHeightButton /> */}
      <ListButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))} */}
    </div>
  )
}
