import { ReactElement, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { getLocalStorage, removeLocalStorage } from 'lib/utils/localStorage'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { useAuthStore } from 'lib/store/Auth'
import { getAuthMe } from 'lib/services/auth'

import { BottomNavigation } from 'components/layout/BottomNavigation'
import { Spinner } from 'components/layout/loaders/Spinner'
import { Drawer } from 'components/layout/Drawer'

export const AuthLayout = ({ children }: { children: ReactNode | ReactElement }) => {
  const { auth, setAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (auth) return

      const token = getLocalStorage('accessToken')

      if (!token) {
        toast('No Autorizado', { type: 'warning' })
        router.push('/auth/signin')
        return
      }

      const { data, error } = await getAuthMe(token)

      if (error) {
        removeLocalStorage('accessToken')
        handleFetchErrors(error.status, error.message)
        router.push('/auth/signin')
        return
      }

      toast('Sesión Recuperada', { type: 'success' })
      setAuth(data)
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  if (!auth) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <Spinner classes='w-20 h-20' />
      </div>
    )
  }

  return (
    <div className='authLayout relative bg-white dark:bg-[#111]'>
      <Drawer />

      <main className='authLayout__content max-w-6xl mx-auto overflow-auto px-4 pt-4 pb-28'>
        {children}
      </main>

      <BottomNavigation />
    </div>
  )
}
