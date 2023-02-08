import { IProductCategoryToCreate, IProductCategoryToUpdate, IReturnProductCategories, IReturnProductCategory } from 'lib/types'

export const getAllProductsCategories = async (): Promise<IReturnProductCategories> => {
  const res = await fetch('/api/shop/product-categories')
  const { data, error } = await res.json()

  if (error) {
    return {
      data: null,
      error: {
        status: res.status,
        message: error
      }
    }
  }

  return { data, error: null }
}

export const getProductCategoryById = async (id: string): Promise<IReturnProductCategory> => {
  const res = await fetch(`/api/shop/product-categories/${id}`)
  const { data, error } = await res.json()

  if (error) {
    return {
      data: null,
      error: {
        status: res.status,
        message: error
      }
    }
  }

  return { data, error: null }
}

export const createProductCategory = async (productCategory: IProductCategoryToCreate): Promise<IReturnProductCategory> => {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...productCategory })
  }

  const res = await fetch('/api/shop/product-categories', options)
  const { data, error } = await res.json()

  if (error) {
    return {
      data: null,
      error: {
        status: res.status,
        message: error
      }
    }
  }

  return { data, error: null }
}

export const updateProductCategoryById = async (id: string, productCategory: IProductCategoryToUpdate): Promise<IReturnProductCategory> => {
  const options: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...productCategory })
  }

  const res = await fetch(`/api/shop/product-categories/${id}`, options)
  const { data, error } = await res.json()

  if (error) {
    return {
      data: null,
      error: {
        status: res.status,
        message: error
      }
    }
  }

  return { data, error: null }
}

export const deleteProductCategoryById = async (id: string): Promise<IReturnProductCategory> => {
  const options: RequestInit = { method: 'DELETE' }

  const res = await fetch(`/api/shop/product-categories/${id}`, options)
  const { data, error } = await res.json()

  if (error) {
    return {
      data: null,
      error: {
        status: res.status,
        message: error
      }
    }
  }

  return { data, error: null }
}
