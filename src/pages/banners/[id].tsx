import { useRouter } from 'next/router'
import Head from 'next/head'

import { AuthLayout } from 'layouts/AuthLayout'
import { IBanner, PageWithLayout, ReactNode } from 'lib/types'
import { useEffect, useState } from 'react'
import { getBannerById } from 'lib/services/banners'
import { toast } from 'react-toastify'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { FormEditBanner } from 'components/pages/banners/FormEditBanner'

export const BannerDetailPage: PageWithLayout = () => {
  const router = useRouter()
  const [banner, setBanner] = useState<IBanner>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const { data, error } = await getBannerById(router.query.id as string)

        if (error) return toast('Hubo un error', { type: 'error' })

        setBanner(data)
        setIsLoading(false)
      }
    })()
  }, [router.query.id])

  if (isLoading) return <LoaderPage />

  return (
    <div>
      <h4 className='text-xl font-bold dark:text-white'>Editar Banner { banner.title }</h4>

      <FormEditBanner {...banner} />
    </div>
  )
}

BannerDetailPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Banner - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)

export default BannerDetailPage
