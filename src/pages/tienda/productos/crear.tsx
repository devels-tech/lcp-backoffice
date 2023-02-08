import Head from 'next/head'

import { PageWithLayout, ReactNode } from 'lib/types'

import { AuthLayout } from 'layouts/AuthLayout'
import { FormCreateProduct } from 'components/pages/tienda/productos/FormCreateProduct'
import { ComingSoon } from 'components/common/ComingSoon'

export const CreateShopProductPage: PageWithLayout = () => {
  return <ComingSoon />
  // return (
  //   <div>
  //     <h4 className='text-xl font-bold dark:text-white'>Crear Producto</h4>

  //     <section className='mt-2'>
  //       <FormCreateProduct />
  //     </section>
  //   </div>
  // )
}

CreateShopProductPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Crear Producto - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)
export default CreateShopProductPage
