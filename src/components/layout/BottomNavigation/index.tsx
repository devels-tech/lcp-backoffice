import { useRef } from 'react'

import { TRouteLinks } from 'lib/types'

import { Bag, DocumentIcon, ImageIcon, PieIcon } from 'components/common/icons'
import { LinkNav } from './LinkNav'

export const BottomNavigation = () => {
  const { current: linksNav } = useRef<{ to: TRouteLinks, label: string, icon: JSX.Element }[]>([
    { to: '/articulos', label: 'Articu', icon: <DocumentIcon /> },
    { to: '/devocionales', label: 'Tienda', icon: <Bag /> },
    { to: '/', label: 'Inicio', icon: <PieIcon /> },
    { to: '/banners', label: 'Activi', icon: <ImageIcon /> },
    { to: '/tienda/productos', label: 'Tienda', icon: <Bag /> }
  ])

  return (
    <div className='fixed bottom-0 left-0 w-full h-16 bg-gray-200 rounded-t md:hidden'>
      <ul className='w-full h-full flex justify-around items-center text-blue-500'>
        {
          linksNav.map(linkNav => (
            <LinkNav
              label={linkNav.label}
              icon={linkNav.icon}
              key={linkNav.to}
              to={linkNav.to}
            />
          ))
        }
      </ul>
    </div>
  )
}
