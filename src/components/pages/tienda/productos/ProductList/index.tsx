import { useEffect, useState } from 'react'
import Link from 'next/link'

import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { getAllProducts } from 'lib/services/shop/products'
import { IProduct } from 'lib/types'

import { EmptyPageContent } from 'components/common/empty/EmptyPageContent'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { ProductListItem } from './ProductListItem'

const theadLabel = [
  { label: 'Titulo' },
  { label: 'Descripcción' },
  { label: 'Precio' },
  { label: 'Acciones' }
]

export const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshProducts = async () => {
    console.log('epale')
    setIsLoading(true)
    const { data, error } = await getAllProducts()

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setProducts(data)
    setIsLoading(false)
  }

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllProducts()

      if (error) {
        setIsLoading(false)
        handleFetchErrors(error.status, error.message)
        return
      }

      setProducts(data)
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) return <LoaderPage />

  if (!products.length) {
    return (
      <EmptyPageContent label='Sin Contenido'>
        <Link href='/tienda/productos/crear' className='text-blue-500 font-bold'>
        Crear Nuevo Producto
        </Link>
      </EmptyPageContent>
    )
  }

  return (
    <section className='mt-10'>
      <span className='text-xl mr-4 dark:text-white'>Productos</span>

      <div className='overflow-x-auto p-3'>
        <table className='table-auto w-full'>
          <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50 dark:bg-[#1a1a1a]'>
            <tr>
              {
                theadLabel.map(thead => (
                  <th
                    key={thead.label}
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'
                  >
                    { thead.label }
                  </th>
                ))
              }
            </tr>
          </thead>

          <tbody className='text-sm divide-y divide-gray-100'>
            {
              products.map(product => (
                <ProductListItem
                  key={product.id}
                  {...product}
                  refreshProducts={refreshProducts}
                  setIsLoading={setIsLoading}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}
