import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { getLocalStorage, removeLocalStorage } from 'lib/utils/localStorage'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { useAuthStore } from 'lib/store/Auth'
import { getAuthMe } from 'lib/services/auth'

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { auth, setAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (auth) return

      const token = getLocalStorage('accessToken')

      if (!token) {
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

  return (
    <div className='MainLayout w-full h-full bg-white dark:bg-[#111]'>
      {children}
    </div>
  )
}
