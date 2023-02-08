import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { getLocalStorage } from 'lib/utils/localStorage'
import { useDrawerStore } from 'lib/store/Drawer'
import { useAuthStore } from 'lib/store/Auth'
import { signOut } from 'lib/services/auth'

import { CategoryIcon, Bag, DocumentIcon, ProfileIcon, ImageIcon, FolderIcon, PieIcon, ShoppingIcon, LogoutIcon, LightThemeIcon, DarkThemeIcon } from 'components/common/icons'
import { LinkNavigationNested } from './LinkNavigationNested'
import { LinkNavigation } from './LinkNavigation'
import { useTheme } from 'lib/hooks/useTheme'

export const Drawer = () => {
  const [, setIsLoading] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { auth, removeAuth } = useAuthStore()
  const { isOpen } = useDrawerStore()
  const router = useRouter()

  const logout = async () => {
    setIsLoading(true)
    const accessToken = getLocalStorage('accessToken')
    const { error } = await signOut(accessToken)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setIsLoading(false)
    router.push('/auth/signin')
    removeAuth()
    toast('Sesión Cerrada', { type: 'info' })
  }

  return (
    <div
      id='drawer-navigation'
      tabIndex={-1}
      style={{ gridArea: 'drawer' }}
      aria-labelledby='drawer-navigation-label'
      className={
        `${isOpen ? '-translate-x-0' : '-translate-x-full'} h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-[#111] hidden transform top-0 left-0 overflow-auto ease-in-out transition-all duration-300 text-gray-700 md:w-56 2xl:w-60 fixed z-40 md:flex flex-col justify-start items-center md:rounded-r-xl pt-5 pb-10 border-r-2 border-gray-100`
      }
    >
      <section className='flex flex-col justify-center items-center text-gray-500 uppercase dark:text-gray-400'>
        <ProfileIcon />

        <div className='mt-2 text-center'>
          <span className='dark:text-white'>{ auth.firstName } { auth.lastName }</span> <br />
          <small className='select-none dark:text-gray-200'>LCP Backoffice</small>
        </div>
      </section>

      {/* <button
        onClick={closeDrawer}
        type='button'
        data-drawer-dismiss='drawer-navigation'
        aria-controls='drawer-navigation'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd'></path></svg>
        <span className='sr-only'>Close menu</span>
      </button> */}

      <div className='w-full py-4 overflow-y-auto'>
        <ul className='space-y-2'>
          <li>
            <LinkNavigation
              to='/dashboard'
              label='Dashboard'
              icon={<PieIcon />}
            />
          </li>

          <li>
            <LinkNavigation
              to='/banners'
              label='Banners'
              icon={<ImageIcon />}
            />
          </li>

          <li>
            <LinkNavigation
              to='/devocionales'
              label='Devocionales'
              icon={<FolderIcon />}
            />
          </li>

          <li>
            <LinkNavigation
              to='/articulos'
              label='Articulos'
              icon={<DocumentIcon />}
            />
          </li>

          <li>
            <LinkNavigationNested
              label='Tienda'
              icon={<Bag />}
              subLinks={[
                {
                  label: 'Categorias',
                  to: '/tienda/categorias',
                  icon: <CategoryIcon />
                },
                {
                  label: 'Productos',
                  to: '/tienda/productos',
                  icon: <ShoppingIcon />
                }
              ]}
            />
          </li>

          <li>
            <button
              onClick={toggleTheme}
              className='w-full flex items-center p-2 group group-hover:text-black text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#282828] select-none'
            >
              {
                theme === 'light'
                  ? <DarkThemeIcon />
                  : <LightThemeIcon />
              }

              <span className='pl-2'>
                {
                  theme === 'light'
                    ? 'Modo Oscuro'
                    : 'Modo Claro'
                }
              </span>
            </button>
          </li>

          <li>
            <button
              onClick={logout}
              className='w-full flex items-center p-2 group group-hover:text-black text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-[#282828] select-none'
            >
              <LogoutIcon />
              <span className='pl-2'>Cerrar Sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
