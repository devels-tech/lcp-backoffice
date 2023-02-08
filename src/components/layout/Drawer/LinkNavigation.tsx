import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import Link from 'next/link'

type LinkNavigationProps = {
  to: '/dashboard' |
  '/tienda' |
  '/tienda/productos' |
  '/tienda/categorias' |
  '/usuarios' |
  '/banners' |
  '/devocionales' |
  '/multimedia' |
  '/articulos'
  label: string
  icon?: ReactNode
}

export const LinkNavigation = ({ to, label, icon }: LinkNavigationProps) => {
  const router = useRouter()

  return (
    <Link
      href={`${to}`}
      className={
        `border-2 border-transparent flex items-center p-2 group group-hover:text-black text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#282828] 
        ${router.pathname.includes(to) && 'border-2 border-gray-300 bg-gray-300 dark:bg-[#282828] dark:border-gray-100 dark:border-2'} select-none`
      }
    >
      <div>{icon}</div>
      <span className='pl-2 mt-0.5'>{label}</span>
    </Link>
  )
}
