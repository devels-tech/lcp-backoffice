import type { ReactElement } from 'react'
import Head from 'next/head'

import { AuthLayout } from 'layouts/AuthLayout'
import { ComingSoon } from 'components/common/ComingSoon'

export default function MultimediaPage () {
  return <ComingSoon />

  // return (
  //   <div>
  //     <div className='w-full h-full'>
  //       <span>LCP Admin - Multimedia</span>
  //       <br />
  //       <span>data</span>
  //     </div>
  //   </div>
  // )
}

MultimediaPage.getLayout = (page: ReactElement) => (
  <AuthLayout>
    <Head>
      <title>Multimedia - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)
