'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useEditorStore } from '@/store/use-editor-store'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Loader } from 'lucide-react'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { Editor } from './editor'
import { Navbar } from './navbar'
import { Toolbar } from './toolbar'

const PdfViewer = dynamic(() => import('./pdf-viewer'), { ssr: false })

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}

const DocumentIdPage: FC<DocumentIdPageProps> = () => {
  const { editor } = useEditorStore()
  const [compiledPdf, setCompiledPdf] = useState<string | null>(null)

  const debouncedHandleChange = useDebounceCallback(
    () => {
      const element = document.getElementById('tiptap')
      if (!element) return
      const pdf = new jsPDF('p', 'pt', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.85)
        const imgWidth = pageWidth
        const imgHeight = pageHeight
        let heightLeft = imgHeight
        let position = 0

        while (heightLeft > 0) {
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
          position -= pageHeight
          if (heightLeft > 0) {
            pdf.addPage()
          }
        }

        const pdfBlob = pdf.output('blob')
        const pdfUrl = URL.createObjectURL(pdfBlob)
        setCompiledPdf(pdfUrl)
      })
    },
    1000,
    { maxWait: 2000 }
  )

  useEffect(() => {
    return () => {
      if (compiledPdf) {
        URL.revokeObjectURL(compiledPdf)
      }
    }
  }, [compiledPdf])

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 bg-[#fafbfd] print:hidden'>
        <Navbar />
        <Toolbar />
      </div>

      <div className='flex flex-1 overflow-hidden'>
        <ResizablePanelGroup direction='horizontal' className='h-full'>
          <ResizablePanel className='border-r !overflow-auto'>
            <div className='bg-[#fafbfd] min-w-[900px]'>
              <div className='print:pt-0 h-full'>
                <Editor onChange={debouncedHandleChange} />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle className='print:hidden' />
          <ResizablePanel className='p-4 print:hidden'>
            {editor?.isEmpty ? (
              <div className='flex items-center justify-center h-full text-gray-500'>
                <p className='text-sm'>
                  Chưa có nội dung nào. Vui lòng nhập nội dung vào bên trái.
                </p>
              </div>
            ) : compiledPdf ? (
              <PdfViewer pdfUrl={compiledPdf} />
            ) : (
              <div className='flex items-center justify-center size-full'>
                <Loader className='animate-spin size-6' />
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
export default DocumentIdPage
