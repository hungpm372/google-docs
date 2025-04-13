'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { Camera, Keyboard, PenLine, Signature, Upload } from 'lucide-react'
import {
  Caveat,
  Cedarville_Cursive,
  Dancing_Script,
  Give_You_Glory,
  Kristi,
  Mr_De_Haviland,
  Norican,
  Over_the_Rainbow,
  Stalemate
} from 'next/font/google'
import React, { FC, useRef, useState } from 'react'

const stalemate = Stalemate({ subsets: ['latin'], weight: '400' })
const overTheRainbow = Over_the_Rainbow({ subsets: ['latin'], weight: '400' })
const caveat = Caveat({ subsets: ['latin'], weight: '400' })
const cedarville = Cedarville_Cursive({ subsets: ['latin'], weight: '400' })
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: '400' })
const giveYouGlory = Give_You_Glory({ subsets: ['latin'], weight: '400' })
const kristi = Kristi({ subsets: ['latin'], weight: '400' })
const mrDeHaviland = Mr_De_Haviland({ subsets: ['latin'], weight: '400' })
const norican = Norican({ subsets: ['latin'], weight: '400' })

const signatureFonts = [
  {
    id: 'stalemate',
    className: stalemate.className,
    fontFamily: 'Stalemate',
    preview: 'Alex Appleseed'
  },
  {
    id: 'over-the-rainbow',
    className: overTheRainbow.className,
    fontFamily: 'Over the Rainbow',
    preview: 'Alex Appleseed'
  },
  {
    id: 'caveat',
    className: caveat.className,
    fontFamily: 'Caveat',
    preview: 'Alex Appleseed'
  },
  {
    id: 'cedarville',
    className: cedarville.className,
    fontFamily: 'Cedarville Cursive',
    preview: 'Alex Appleseed'
  },
  {
    id: 'dancing-script',
    className: dancingScript.className,
    fontFamily: 'Dancing Script',
    preview: 'Alex Appleseed'
  },
  {
    id: 'give-you-glory',
    className: giveYouGlory.className,
    fontFamily: 'Give You Glory',
    preview: 'Alex Appleseed'
  },
  {
    id: 'kristi',
    className: kristi.className,
    fontFamily: 'Kristi',
    preview: 'Alex Appleseed'
  },
  {
    id: 'mr-de-haviland',
    className: mrDeHaviland.className,
    fontFamily: 'Mr De Haviland',
    preview: 'Alex Appleseed'
  },
  {
    id: 'norican',
    className: norican.className,
    fontFamily: 'Norican',
    preview: 'Alex Appleseed'
  }
]

const signatureColors = [
  '#4a79ef',
  '#3857b2',
  '#3040bc',
  '#0010ff',
  '#5a5a5a',
  '#333333',
  '#000000'
]

export const SignatureButton: FC = () => {
  const { editor, addSignature } = useEditorStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [signatureText, setSignatureText] = useState<string>('Alex Appleseed')
  const [selectedColor, setSelectedColor] = useState<string>('#000000')
  const [selectedFont, setSelectedFont] = useState<string>('font-1')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  //   const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('type')

  // Handle drawing signature
  //   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //     const canvas = canvasRef.current
  //     if (canvas) {
  //       const ctx = canvas.getContext('2d')
  //       if (ctx) {
  //         setIsDrawing(true)
  //         ctx.beginPath()
  //         ctx.lineWidth = 2
  //         ctx.lineCap = 'round'
  //         ctx.strokeStyle = selectedColor
  //         const rect = canvas.getBoundingClientRect()
  //         ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  //       }
  //     }
  //   }

  //   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //     if (!isDrawing) return
  //     const canvas = canvasRef.current
  //     if (canvas) {
  //       const ctx = canvas.getContext('2d')
  //       if (ctx) {
  //         const rect = canvas.getBoundingClientRect()
  //         ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
  //         ctx.stroke()
  //       }
  //     }
  //   }

  //   const stopDrawing = () => {
  //     setIsDrawing(false)
  //   }

  //   const clearCanvas = () => {
  //     const canvas = canvasRef.current
  //     if (canvas) {
  //       const ctx = canvas.getContext('2d')
  //       if (ctx) {
  //         ctx.clearRect(0, 0, canvas.width, canvas.height)
  //       }
  //     }
  //   }

  // Handle file upload
  //   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0]
  //     if (file) {
  //       console.log('File selected:', file.name)
  //     }
  //   }

  const insertSignature = () => {
    if (editor) {
      if (activeTab === 'type' && signatureText) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const selectedFontObj = signatureFonts.find((font) => font.id === selectedFont)
        const fontSize = 30

        if (ctx && selectedFontObj) {
          ctx.font = `${fontSize}px '${selectedFontObj.fontFamily}', cursive`
          const textWidth = ctx.measureText(signatureText).width

          canvas.width = textWidth + 20
          canvas.height = fontSize * 1.5

          ctx.font = `${fontSize}px '${selectedFontObj.fontFamily}', cursive`
          ctx.fillStyle = selectedColor
          ctx.textBaseline = 'middle'
          ctx.fillText(signatureText, 10, canvas.height / 2)

          const dataUrl = canvas.toDataURL('image/png')
          addSignature({
            src: dataUrl,
            x: 100,
            y: 100,
            width: canvas.width,
            height: canvas.height
          })
        }
      } else if (activeTab === 'draw' && canvasRef.current) {
        const dataUrl = canvasRef.current.toDataURL('image/png')
        addSignature({
          src: dataUrl,
          x: 100,
          y: 100,
          width: canvasRef.current.width,
          height: canvasRef.current.height
        })
      }

      setIsOpen(false)
    }
  }

  return (
    <React.Fragment>
      <button
        onClick={() => setIsOpen(true)}
        className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'
        aria-label='Insert Signature'
      >
        <Signature className='size-4' />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Create signature</DialogTitle>
          </DialogHeader>

          <Tabs
            defaultValue='type'
            value={activeTab}
            onValueChange={setActiveTab}
            className='w-full'
          >
            <TabsList className='grid grid-cols-4 mb-6'>
              <TabsTrigger value='type' className='flex items-center gap-2'>
                <Keyboard className='size-4' /> Type
              </TabsTrigger>
              <TabsTrigger value='draw' className='flex items-center gap-2'>
                <PenLine className='size-4' /> Draw
              </TabsTrigger>
              <TabsTrigger value='upload' className='flex items-center gap-2'>
                <Upload className='size-4' /> Upload Image
              </TabsTrigger>
              <TabsTrigger value='camera' className='flex items-center gap-2'>
                <Camera className='size-4' /> Camera
              </TabsTrigger>
            </TabsList>

            <TabsContent value='type' className='space-y-4'>
              <Input
                placeholder='Your name'
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)}
                className='text-center text-lg border-2 py-4 w-2/3 mx-auto'
              />

              <div className='flex justify-center space-x-2 my-4'>
                {signatureColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'size-4 rounded-full',
                      selectedColor === color && 'ring-2 ring-offset-2 ring-blue-500'
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-6'>
                {signatureFonts.map((font) => (
                  <div
                    key={font.id}
                    onClick={() => setSelectedFont(font.id)}
                    className={cn(
                      'border p-3 cursor-pointer rounded hover:bg-gray-50 flex items-center justify-center text-2xl',
                      selectedFont === font.id && 'border-blue-500 bg-blue-50',
                      font.className
                    )}
                    style={{ color: selectedColor }}
                  >
                    {signatureText || font.preview}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* <TabsContent value='draw' className='space-y-4'>
              <div className='border-2 rounded-md bg-blue-50 relative'>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={200}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className='w-full cursor-crosshair'
                />
                <button
                  onClick={clearCanvas}
                  className='absolute top-2 right-2 bg-white rounded-md px-2 py-1 text-sm'
                >
                  Clear
                </button>
              </div>

              <div className='flex justify-center space-x-2 my-4'>
                {signatureColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'w-8 h-8 rounded-full',
                      selectedColor === color && 'ring-2 ring-offset-2 ring-blue-500'
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value='upload' className='space-y-4'>
              <div className='border-2 border-dashed rounded-md p-8 text-center'>
                <div className='flex flex-col items-center'>
                  <Upload className='size-8 mb-2 text-gray-400' />
                  <p className='mb-4'>Upload your signature image</p>
                  <input
                    type='file'
                    id='signature-upload'
                    className='hidden'
                    onChange={handleFileUpload}
                    accept='image/*'
                  />
                  <label
                    htmlFor='signature-upload'
                    className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600'
                  >
                    Choose File
                  </label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value='camera' className='space-y-4'>
              <div className='border-2 rounded-md p-8 text-center bg-gray-100'>
                <div className='flex flex-col items-center'>
                  <Camera className='size-12 mb-4 text-gray-400' />
                  <p className='mb-4'>Camera access is required</p>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600'>
                    Enable Camera
                  </button>
                </div>
              </div>
            </TabsContent> */}
          </Tabs>

          <DialogFooter>
            <Button variant='ghost' onClick={() => setIsOpen(false)}>
              Đóng
            </Button>
            <Button onClick={insertSignature}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
