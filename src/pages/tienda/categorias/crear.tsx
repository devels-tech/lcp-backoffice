import Head from 'next/head'

import { useCategoriesProduct } from 'lib/hooks/shop/useProductCategories'
import { PageWithLayout, ReactNode } from 'lib/types'

import { AuthLayout } from 'layouts/AuthLayout'
import { FormCreateProductCategory } from 'components/pages/tienda/categorias/FormCreateProductCategory'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { ComingSoon } from 'components/common/ComingSoon'

export const CreateShopProductCategoryPage: PageWithLayout = () => {
  return <ComingSoon />
  // const { isLoading, createProductCategory } = useCategoriesProduct()

  // if (isLoading) return <LoaderPage />

  // return (
  //   <div>
  //     <h4 className='text-xl font-bold dark:text-white'>Crear Categoria</h4>

  //     <section className='mt-2'>
  //       <FormCreateProductCategory createProductCategory={createProductCategory} />
  //     </section>
  //   </div>
  // )
}

CreateShopProductCategoryPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Crear Categoria - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)

export default CreateShopProductCategoryPage
