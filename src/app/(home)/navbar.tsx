import Image from 'next/image'
import Link from 'next/link'
import { FC, Suspense } from 'react'
import { SearchInput } from './search-input'

export const Navbar: FC = () => {
  return (
    <nav className='flex items-center justify-between size-full'>
      <div className='flex gap-3 items-center shrink-0 pr-6'>
        <Link href='/'>
          <Image src='/logo.svg' alt='Google Docs' width={36} height={36} className='size-9' />
        </Link>
        <h3 className='text-xl'>Docs</h3>
      </div>
      <Suspense>
        <SearchInput />
      </Suspense>
    </nav>
  )
}
