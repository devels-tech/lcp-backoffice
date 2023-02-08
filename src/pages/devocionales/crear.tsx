import Head from 'next/head'

import { PageWithLayout, ReactNode } from 'lib/types'

import { AuthLayout } from 'layouts/AuthLayout'
import { FormCreateDevotional } from 'components/pages/devocionales/FormCreateDevotional'
import { ComingSoon } from 'components/common/ComingSoon'

export const CreateDevotionalPage: PageWithLayout = () => {
  return <ComingSoon />
  // return (
  //   <div>
  //     <h4 className='text-xl font-bold'>Crear Devocional</h4>

  //     <section className='mt-2'>
  //       <FormCreateDevotional />
  //     </section>
  //   </div>
  // )
}

CreateDevotionalPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Crear Devocional - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)
export default CreateDevotionalPage
