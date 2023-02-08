import type { ReactElement } from 'react'
import Head from 'next/head'

import { AuthLayout } from 'layouts/AuthLayout'
import { ComingSoon } from 'components/common/ComingSoon'

export default function DashboardPage () {
  return <ComingSoon />
}

DashboardPage.getLayout = (page: ReactElement) => (
  <AuthLayout>
    <Head>
      <title>LCP Admin</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    {page}
  </AuthLayout>
)
