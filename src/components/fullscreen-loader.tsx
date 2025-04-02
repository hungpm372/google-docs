import { LoaderIcon } from 'lucide-react'
import { FC } from 'react'

interface FullscreenLoaderProps {
  label?: string
  className?: string
}

export const FullscreenLoader: FC<FullscreenLoaderProps> = ({ label }) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-2'>
      <LoaderIcon className='size-6 text-muted-foreground animate-spin' />
      {label && <p className='text-sm text-muted-foreground'>{label}</p>}
    </div>
  )
}
