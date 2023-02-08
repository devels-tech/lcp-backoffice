import type { ReactElement } from 'react'
import Head from 'next/head'

import { AuthLayout } from 'layouts/AuthLayout'
import { ComingSoon } from 'components/common/ComingSoon'

export default function EventosPage () {
  return <ComingSoon />
  // return (
  //   <div className='w-full h-full'>
  //     <span>LCP Admin - Eventos</span>
  //     <br />
  //     <span>data</span>
  //   </div>
  // )
}

EventosPage.getLayout = (page: ReactElement) => (
  <AuthLayout>
    <Head>
      <title>Eventos - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)
