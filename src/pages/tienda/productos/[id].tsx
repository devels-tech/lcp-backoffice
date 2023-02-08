import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import { IProduct, PageWithLayout, ReactNode } from 'lib/types'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { getProductById } from 'lib/services/shop/products'

import { AuthLayout } from 'layouts/AuthLayout'
import { FormEditProduct } from 'components/pages/tienda/productos/FormEditProduct'
import { EmptyPageContent } from 'components/common/empty/EmptyPageContent'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { ComingSoon } from 'components/common/ComingSoon'

export const ShopProductDetailPage: PageWithLayout = () => {
  return <ComingSoon />
  // const [product, setProduct] = useState<IProduct>(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const router = useRouter()

  // useEffect(() => {
  //   (async () => {
  //     if (router.query.id) {
  //       const { data, error } = await getProductById(router.query.id as string)

  //       if (error) {
  //         setIsLoading(false)
  //         handleFetchErrors(error.status, error.message)
  //         return
  //       }

  //       setProduct(data)
  //       setIsLoading(false)
  //     }
  //   })()
  // }, [router.query.id])

  // if (isLoading) return <LoaderPage />

  // if (!product) return (
  //   <EmptyPageContent label='Sin Contenido'>
  //     <Link href='/tienda/productos/crear' className='text-blue-500 font-bold'>
  //       Crear Nuevo Producto
  //     </Link>
  //   </EmptyPageContent>
  // )

  // return (
  //   <div>
  //     <h4 className='text-xl font-bold dark:text-white'>Editar Producto { product.title }</h4>

  //     <FormEditProduct {...product} />
  //   </div>
  // )
}

ShopProductDetailPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Producto - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)

export default ShopProductDetailPage
