
import Head from 'next/head'

import { PageWithLayout, ReactNode } from 'lib/types'

import { AuthLayout } from 'layouts/AuthLayout'
import { ProductList } from 'components/pages/tienda/productos/ProductList'
import { LinkAsButton } from 'components/common/Button'
import { ComingSoon } from 'components/common/ComingSoon'

export const ShopProductsPage: PageWithLayout = () => {
  return <ComingSoon />
  // return (
  //   <div>
  //     <h4 className='text-xl font-bold dark:text-white'>Tienda</h4>

  //     <LinkAsButton to='/tienda/productos/crear' classes='mt-2'>
  //       Crear Nuevo Producto
  //     </LinkAsButton>

  //     <section className='mt-4'>
  //       <ProductList />
  //     </section>
  //   </div>
  // )
}

ShopProductsPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Productos - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)

export default ShopProductsPage
