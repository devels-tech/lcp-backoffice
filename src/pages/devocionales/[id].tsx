import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { IDevotional, PageWithLayout, ReactNode } from 'lib/types'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { getDevotionalsById } from 'lib/services/devotionals'
import { AuthLayout } from 'layouts/AuthLayout'

import { FormEditDevotional } from 'components/pages/devocionales/FormEditDevotional'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { ComingSoon } from 'components/common/ComingSoon'

export const DevotionalDetailPage: PageWithLayout = () => {
  return <ComingSoon />
  // const [devotional, setDevotional] = useState<IDevotional>(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const router = useRouter()

  // useEffect(() => {
  //   (async () => {
  //     if (router.query.id) {
  //       const { data, error } = await getDevotionalsById(router.query.id as string)

  //       if (error) {
  //         setIsLoading(false)
  //         handleFetchErrors(error.status, error.message)
  //         return
  //       }

  //       setDevotional(data)
  //       setIsLoading(false)
  //     }
  //   })()
  // }, [router.query.id])

  // if (isLoading) return <LoaderPage />

  // return (
  //   <div>
  //     <h4 className='text-xl font-bold'>Editar Devocional { devotional.title }</h4>

  //     <FormEditDevotional {...devotional} />
  //   </div>
  // )
}

DevotionalDetailPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Devocional - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)

export default DevotionalDetailPage
