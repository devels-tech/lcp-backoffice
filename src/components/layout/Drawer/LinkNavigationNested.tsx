import { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

type LinkNavigationNestedProps = {
  label: string
  icon?: ReactNode
  subLinks: {
    to: '/' |
    '/tienda' |
    '/tienda/productos' |
    '/tienda/categorias' |
    '/usuarios' |
    '/banners' |
    '/devocionales' |
    '/reservaciones' |
    '/multimedia' |
    '/articulos',
    label: string
    icon?: ReactNode
}[]
}

export const LinkNavigationNested = ({ label, icon, subLinks }: LinkNavigationNestedProps) => {
  const [show, setShow] = useState(false)
  const router = useRouter()

  const toggleShow = () => setShow(prevState => !prevState)

  return (
    <>
      <button
        onClick={toggleShow}
        type='button'
        className='flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-[#282828] select-none'
        aria-controls='dropdown-example'
        data-collapse-toggle='dropdown-example'
      >
        <svg aria-hidden='true' className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z' clipRule='evenodd'></path></svg>
        <span className='flex-1 ml-3 text-left whitespace-nowrap'>{ label }</span>
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd'></path></svg>
      </button>

      <ul id='dropdown-example' className={`${show ? 'block' : 'hidden'} py-2 space-y-2`}>
        {
          subLinks.map(subLink => (
            <li key={ subLink.to }>
              <Link
                href={ subLink.to }
                className={
                  `border-2 border-transparent flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-[#282828] 
                  ${router.pathname.includes(subLink.to) && 'border-2 border-gray-300 bg-gray-300 dark:bg-[#282828] dark:border-gray-100 dark:border-2'} select-none`
                }
              >
                <div>{ subLink?.icon }</div>
                <span className='pl-2 mt-0.5'>{ subLink.label }</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}
