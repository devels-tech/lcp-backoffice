import type { ReactElement } from 'react'
import Head from 'next/head'

import { AuthLayout } from 'layouts/AuthLayout'
import { ComingSoon } from 'components/common/ComingSoon'

export default function ComingSoonPage () {
  return <ComingSoon />
}

ComingSoonPage.getLayout = (page: ReactElement) =>
  <AuthLayout>
    <Head>
      <title>Proximamente - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
