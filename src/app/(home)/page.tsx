import Link from 'next/link'
import { Navbar } from './navbar'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <Link
          href='/documents/1'
          className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 inline-block'
        >
          Go to Document Editor
        </Link>
      </div>
    </div>
  )
}
