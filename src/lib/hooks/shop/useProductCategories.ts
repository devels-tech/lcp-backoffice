import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

import { createProductCategory, deleteProductCategoryById, getAllProductsCategories, getProductCategoryById, updateProductCategoryById } from 'lib/services/shop/productCategories'
import { IProductCategory, IProductCategoryToCreate, IProductCategoryToUpdate } from 'lib/types'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'

type TUseProductCategoriesOperations = 'getInit'

export const useCategoriesProduct = (operations?: TUseProductCategoriesOperations) => {
  const [productCategories, setProductCategories] = useState<IProductCategory[]>([])
  const [productCategoryDetail, setProductCategoryDetail] = useState<IProductCategory>(null)
  const [isLoading, setIsLoading] = useState(false)

  const _getAllProductCategories = async () => {
    setIsLoading(true)
    const { data, error } = await getAllProductsCategories()

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setProductCategories(data)
    setIsLoading(false)
  }

  const _getProductCategoryById = async (id: string) => {
    setIsLoading(true)
    const { data, error } = await getProductCategoryById(id)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setProductCategoryDetail(data)
    setIsLoading(false)
  }

  const _createProductCategory = async (product: IProductCategoryToCreate) => {
    setIsLoading(true)
    const { data, error } = await createProductCategory(product)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setProductCategories(prevState => ([...prevState, data]))
    setIsLoading(false)
    toast('Categoria creada exitosamente', { type: 'success' })
  }

  const _updateProductCategoryById = async (id: string, product: IProductCategoryToUpdate) => {
    setIsLoading(true)
    const { data, error } = await updateProductCategoryById(id, product)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setProductCategoryDetail(data)
    setIsLoading(false)
    toast('Categoria actualizada exitosamente', { type: 'success' })
  }

  const _deleteProductCategoryById = async (id: string) => {
    setIsLoading(true)
    const { error } = await deleteProductCategoryById(id)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    const productCategoriesRefreshed = productCategories.filter(category => category.id !== id)
    setProductCategories(productCategoriesRefreshed)

    setIsLoading(false)
    toast('Categoria eliminada exitosamente', { type: 'success' })
  }

  useEffect(() => {
    (async () => {
      operations === 'getInit' && await _getAllProductCategories()
    })()
  }, [operations])

  return {
    isLoading,
    productCategories,
    productCategoryDetail,
    getProductCategories: _getAllProductCategories,
    createProductCategory: _createProductCategory,
    getProductCategoryById: _getProductCategoryById,
    updateProductCategoryById: _updateProductCategoryById,
    deleteProductCategoryById: _deleteProductCategoryById
  }
}
