import Head from 'next/head'

import { PageWithLayout, ReactNode } from 'lib/types'

import { AuthLayout } from 'layouts/AuthLayout'
import { DevotionalList } from 'components/pages/devocionales/DevotionalList'
import { ComingSoon } from 'components/common/ComingSoon'
import { LinkAsButton } from 'components/common/Button'

export const DevotionalsPage: PageWithLayout = () => {
  return <ComingSoon />
  // return (
  //   <div>
  //     <h4 className='text-xl font-bold dark:text-white'>Devocional</h4>

  //     <LinkAsButton to='/devocionales/crear' classes='mt-2'>
  //       Crear Nuevo Devocional
  //     </LinkAsButton>

  //     <section className='mt-4'>
  //       <DevotionalList />
  //     </section>
  //   </div>
  // )
}

DevotionalsPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Devocionales - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)
export default DevotionalsPage
