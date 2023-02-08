import Head from 'next/head'

import { PageWithLayout, ReactNode } from 'lib/types'

import { AuthLayout } from 'layouts/AuthLayout'
import { FormCreateArticle } from 'components/pages/articulos/FormCreateArticle'
import { ComingSoon } from 'components/common/ComingSoon'

export const CreateArticlesPage: PageWithLayout = () => {
  return <ComingSoon />
  // return (
  //   <div>
  //     <h4 className='text-xl font-bold dark:text-white'>Crear Artículo</h4>

  //     <section className='mt-2'>
  //       <FormCreateArticle />
  //     </section>
  //   </div>
  // )
}

CreateArticlesPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Crear Artículo - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)

export default CreateArticlesPage
