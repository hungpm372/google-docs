import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { PaginationStatus } from 'convex/react'
import { LoaderIcon } from 'lucide-react'
import { FC } from 'react'
import { Doc } from '../../../convex/_generated/dataModel'
import { DocumentRow } from './document-row'

interface DocumentsTableProps {
  status: PaginationStatus
  documents: Doc<'documents'>[] | undefined
  loadMore: (numItems: number) => void
}

export const DocumentsTable: FC<DocumentsTableProps> = ({ documents }) => {
  return (
    <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5'>
      {documents === undefined ? (
        <div className='flex justify-center items-center h-24'>
          <LoaderIcon className='animate-spin size-5 text-muted-foreground' />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent border-none'>
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className='hidden md:table-cell'>Shared</TableHead>
              <TableHead className='hidden md:table-cell'>Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.length === 0 ? (
              <TableRow className='hover:bg-transparent'>
                <TableCell colSpan={4} className='text-center h-24 text-muted-foreground'>
                  No documents found.
                </TableCell>
              </TableRow>
            ) : (
              documents.map((document) => <DocumentRow key={document._id} document={document} />)
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
