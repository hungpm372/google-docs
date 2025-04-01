import { FC } from 'react'
import { Editor } from './editor'
import { Toolbar } from './toolbar'

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}

const DocumentIdPage: FC<DocumentIdPageProps> = async ({ params }) => {
  const documentId = (await params).documentId
  console.log('Document ID:', documentId)

  return (
    <div className='min-h-screen bg-[#fafbfd]'>
      <Toolbar />
      <Editor />
    </div>
  )
}
export default DocumentIdPage
