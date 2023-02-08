import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from 'lib/services/shop/products'
import { IProduct, IProductToCreate, IProductToUpdate } from 'lib/types'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { useModalStore } from 'lib/store/Modal'

type TUseProductsOperations = 'getInit'

export const useProducts = (operations?: TUseProductsOperations) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [productDetail, setProductDetail] = useState<IProduct>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { setModal } = useModalStore()

  const _getAllProducts = async () => {
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

  const _getProductById = async (id: string) => {
    setIsLoading(true)
    const { data, error } = await getProductById(id)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setProductDetail(data)
    setIsLoading(false)
  }

  const _createProduct = async (product: IProductToCreate) => {
    setIsLoading(true)
    const { data, error } = await createProduct(product)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setProducts(prevState => ([...prevState, data]))
    setIsLoading(false)
    toast('Producto creado exitosamente', { type: 'success' })
  }

  const _updateProductById = async (id: string, product: IProductToUpdate) => {
    setIsLoading(true)
    const { data, error } = await updateProductById(id, product)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setProductDetail(data)
    setIsLoading(false)
    toast('Producto actualizado exitosamente', { type: 'success' })
  }

  const _deleteProductById = async (id: string) => {
    setModal({
      isOpen: true,
      type: 'confirm',
      confirmFn: (async () => {
        setIsLoading(true)
        const { error } = await deleteProductById(id)

        if (error) {
          setIsLoading(false)
          handleFetchErrors(error.status, error.message)
          return
        }

        setProducts(prevState => prevState.filter(product => product.id !== id))
        setIsLoading(false)
        toast('Producto eliminado exitosamente', { type: 'success' })
      })()
    })
  }

  useEffect(() => {
    (async () => {
      operations === 'getInit' && await _getAllProducts()
    })()
  }, [operations])

  return {
    products,
    isLoading,
    productDetail,
    getProducts: _getAllProducts,
    createProduct: _createProduct,
    getProductById: _getProductById,
    updateProduct: _updateProductById,
    deleteProductById: _deleteProductById
  }
}
