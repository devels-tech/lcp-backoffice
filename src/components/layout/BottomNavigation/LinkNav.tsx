import Link from 'next/link'
import { TRouteLinks } from 'lib/types'

interface ILinkNavProps {
  to: TRouteLinks
  label: string
  icon: JSX.Element
}

export const LinkNav = ({ to, label, icon }: ILinkNavProps) => {
  return (
    <li className='select-none'>
      <Link href={to} className='hover:text-blue-300'>
        {icon || label }
      </Link>
    </li>
  )
}
