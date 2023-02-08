import { IFetchReturn } from './http'

export interface IProductCategory {
  id: string
  title: string
  slug: string
  description: string
  // eslint-disable-next-line no-use-before-define
  products: IProduct[]
  createdAt: string
  updatedAt: string
}

export interface IProductCategoryToCreate {
  title: string
  slug: string
  description: string
}

export interface IProductCategoryToUpdate {
  title?: string
  slug?: string
  description?: string
}

export interface IProduct {
  image: {
    publicId: string
    url: string
    width: number
    height: number
  },
  title: string
  slug: string
  price: number
  published: true,
  description: string
  category: IProductCategory
  createdAt: string
  updatedAt: string
  id: string
}

export interface IProductToCreate {
  title: string
  image: FileList
  price: number
  slug: string
  description: string
  categoryId: string
  published: boolean
}

export interface IProductToUpdate {
  title?: string
  image?: FileList
  price?: number
  slug?: string
  description?: string
  categoryId?: string
  published?: boolean
}

export interface IReturnProducts extends IFetchReturn {
  data: IProduct[]
}

export interface IReturnProduct extends IFetchReturn {
  data: IProduct
}

export interface IReturnProductCategories extends IFetchReturn {
  data: IProductCategory[]
}

export interface IReturnProductCategory extends IFetchReturn {
  data: IProductCategory
}
