'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useEditorStore } from '@/store/use-editor-store'
import { useMutation, useQuery } from 'convex/react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Loader } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { Editor } from './editor'
import { Navbar } from './navbar'
import { Toolbar } from './toolbar'

const PdfViewer = dynamic(() => import('./pdf-viewer'), { ssr: false })

const DocumentIdPage: FC = () => {
  const params = useParams<{ documentId: string }>()
  const update = useMutation(api.documents.updateById)
  const documentResult = useQuery(api.documents.getById, {
    id: params.documentId as Id<'documents'>
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { editor, signatures, setSignatures } = useEditorStore()
  const [compiledPdf, setCompiledPdf] = useState<string | null>(null)

  const debouncedHandleChange = useDebounceCallback(
    () => {
      const element = document.getElementById('tiptap')
      if (!element || !documentResult) return

      setIsLoading(true)
      update({
        id: params.documentId as Id<'documents'>,
        initialContent: editor?.getHTML(),
        signatures: [...signatures]
      }).finally(() => {
        setIsLoading(false)
      })

      const pdf = new jsPDF('p', 'pt', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        ignoreElements: (element) => {
          return element.classList?.contains('signature-container')
        }
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

        signatures.forEach((sig) => {
          let posX = sig.x
          let posY = sig.y

          if (sig.xPercent !== undefined && sig.yPercent !== undefined) {
            posX = (sig.xPercent / 100) * pageWidth
            posY = (sig.yPercent / 100) * pageHeight
          }

          const editorWidth = 816
          const scaleRatio = pageWidth / editorWidth

          const adjustedWidth = sig.width * scaleRatio
          const adjustedHeight = sig.height * scaleRatio

          pdf.addImage(sig.src, 'PNG', posX, posY, adjustedWidth, adjustedHeight)
        })

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

  useEffect(() => {
    if (!documentResult) return

    debouncedHandleChange()
    return () => {
      debouncedHandleChange.cancel()
    }
  }, [documentResult, signatures])

  useEffect(() => {
    setSignatures(
      documentResult ? (documentResult.signatures ? documentResult.signatures : []) : []
    )
  }, [documentResult, params.documentId])

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 bg-[#fafbfd] print:hidden'>
        <Navbar data={documentResult} isLoading={isLoading} />
        <Toolbar />
      </div>

      <div className='flex flex-1 overflow-hidden'>
        <ResizablePanelGroup direction='horizontal' className='h-full'>
          <ResizablePanel className='border-r !overflow-auto'>
            <div className='bg-[#fafbfd] min-w-[900px]'>
              <div className='print:pt-0 h-full'>
                {documentResult ? (
                  <Editor
                    onChange={debouncedHandleChange}
                    initialContent={documentResult.initialContent}
                  />
                ) : (
                  <div className='flex items-center justify-center size-full h-[calc(100vh-108px)]'>
                    <Loader className='animate-spin size-6' />
                  </div>
                )}
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
