import { IProductToCreate, IProductToUpdate, IReturnProducts, IReturnProduct } from 'lib/types'

export const getAllProducts = async (): Promise<IReturnProducts> => {
  const res = await fetch('/api/shop/products')
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

export const getProductById = async (id: string): Promise<IReturnProduct> => {
  const res = await fetch(`/api/shop/products/${id}`)
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

export const createProduct = async (product: IProductToCreate): Promise<IReturnProduct> => {
  const formData = new FormData()
  const entries = Object.entries(product)

  entries.forEach(([key, value]) => {
    if (key === 'image') {
      if (!value) return
    }

    formData.append(key, value)
  })

  const options: RequestInit = { method: 'POST', body: formData }

  const res = await fetch('/api/shop/products', options)
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

export const updateProductById = async (id: string, product: IProductToUpdate): Promise<IReturnProduct> => {
  const formData = new FormData()
  const entries = Object.entries(product)

  entries.forEach(([key, value]) => {
    if (key === 'image') {
      if (!value) return
    }

    formData.append(key, value)
  })

  const options: RequestInit = { method: 'PUT', body: formData }

  const res = await fetch(`/api/shop/products/${id}`, options)
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

export const deleteProductById = async (id: string): Promise<IReturnProduct> => {
  const options: RequestInit = { method: 'DELETE' }

  const res = await fetch(`/api/shop/products/${id}`, options)
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
