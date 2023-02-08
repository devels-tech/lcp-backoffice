import Head from 'next/head'

import { PageWithLayout, ReactNode } from 'lib/types'

import { AuthLayout } from 'layouts/AuthLayout'
import { ArticleList } from 'components/pages/articulos/ArticleList'
import { ComingSoon } from 'components/common/ComingSoon'
import { LinkAsButton } from 'components/common/Button'

export const ArticlesPage: PageWithLayout = () => {
  return <ComingSoon />
  // return (
  //   <div>
  //     <h4 className='text-xl font-bold dark:text-white'>Articulos</h4>

  //     <LinkAsButton to='/articulos/crear' classes='mt-2'>
  //       Crear Nuevo Artículo
  //     </LinkAsButton>

  //     <section className='mt-4'>
  //       <ArticleList />
  //     </section>
  //   </div>
  // )
}

ArticlesPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Artículos - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)
export default ArticlesPage
