import Link from 'next/link'
import { ReactNode } from 'react'

interface ILinkPage {
  children: ReactNode
  to: string
}

export const LinkPage = ({ children, to }: ILinkPage) => {
  return (
    <Link href={to} className='text-blue-500 hover:text-blue-600'>
      { children }
    </Link>
  )
}
