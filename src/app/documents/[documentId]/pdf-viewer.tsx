'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Download, Loader, Minus, Plus, Printer } from 'lucide-react'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [scale, setScale] = useState<number>(1.2)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [numPages, setNumPages] = useState<number | null>(null)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const handleExportPdf = () => {
    const link = document.createElement('a')
    link.href = pdfUrl

    link.download = 'document.pdf'
    link.click()
  }

  return (
    <div className='flex flex-col h-full border rounded-lg shadow-md bg-white overflow-hidden'>
      <div className='flex items-center justify-between py-3 px-4 bg-white border-b border-gray-100 shadow-sm'>
        <div className='flex items-center space-x-1'>
          <Button
            variant='outline'
            size='sm'
            className='h-8 px-3 rounded-md hover:bg-gray-50'
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft />
            Trước
          </Button>
          <div className='px-3 text-sm font-medium bg-gray-50 border border-gray-100 rounded-md py-1'>
            {pageNumber} / {numPages || 0}
          </div>
          <Button
            variant='outline'
            size='sm'
            className='h-8 px-3 rounded-md hover:bg-gray-50'
            disabled={!!(numPages && pageNumber >= numPages)}
            onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages || prev + 1))}
          >
            Tiếp
            <ChevronRight />
          </Button>
        </div>

        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            className='h-8 w-8 p-0 rounded-md'
            onClick={() => setScale((prev) => Math.max(0.5, prev - 0.25))}
            disabled={scale <= 0.5}
          >
            <Minus />
          </Button>
          <span className='text-sm font-medium bg-gray-50 border border-gray-100 rounded-md py-1 px-3 min-w-14 text-center'>
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant='outline'
            size='sm'
            className='h-8 w-8 p-0 rounded-md'
            onClick={() => setScale((prev) => Math.min(2.0, prev + 0.25))}
            disabled={scale >= 2.0}
          >
            <Plus />
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='h-8 px-3 ml-2 rounded-md hover:bg-gray-50'
            onClick={() => window.open(pdfUrl, '_blank')}
            disabled={!pdfUrl}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-1'
            >
              <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
              <polyline points='15 3 21 3 21 9' />
              <line x1='10' y1='14' x2='21' y2='3' />
            </svg>
            Tab mới
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='h-8 px-3 ml-2 rounded-md hover:bg-gray-50'
            onClick={() => window.print()}
            disabled={!pdfUrl}
          >
            <Printer />
            In
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='h-8 px-3 ml-2 rounded-md hover:bg-gray-50'
            onClick={handleExportPdf}
            disabled={!pdfUrl}
          >
            <Download className='mr-1' />
            Xuất PDF
          </Button>
        </div>
      </div>

      <div className='flex-1 overflow-auto bg-gray-50 p-6'>
        <div className='flex justify-center'>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className='flex items-center justify-center size-full'>
                <Loader className='animate-spin size-6' />
              </div>
            }
            error={
              <div className='flex items-center justify-center p-8 text-red-500 bg-red-50 rounded-lg border border-red-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mr-2'
                >
                  <circle cx='12' cy='12' r='10'></circle>
                  <line x1='12' y1='8' x2='12' y2='12'></line>
                  <line x1='12' y1='16' x2='12.01' y2='16'></line>
                </svg>
                Đã xảy ra lỗi khi tải PDF. Vui lòng thử lại sau.
              </div>
            }
            className='flex justify-center'
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className='shadow-md'
              loading={<div className='w-full h-full min-h-72 bg-gray-100 animate-pulse'></div>}
            />
          </Document>
        </div>
      </div>

      <div className='py-2 px-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center'>
        <span>PDF Viewer</span>
        <span>
          Trang {pageNumber} / {numPages || 0}
        </span>
      </div>
    </div>
  )
}

export default PdfViewer
