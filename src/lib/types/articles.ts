/* eslint-disable no-unused-vars */
import { IFetchReturn } from './http'
import { IAuthor } from './authors'

export type TArticleType = 'ESPIRITU' | 'ALMA' | 'CUERPO'
export type TArticleCategory = 'NUTRICION' | 'PSICOLOGIA' | 'REFLEXIONES' | 'DEPORTES'

export enum EArticleType {
  ESPIRITU = 'ESPIRITU',
  ALMA = 'ALMA',
  CUERPO = 'CUERPO',
}

export enum EArticleCategory {
  NUTRICION = 'NUTRICION',
  PSICOLOGIA = 'PSICOLOGIA',
  REFLEXIONES = 'REFLEXIONES',
  DEPORTES = 'DEPORTES',
}

export interface IArticleToCreate {
  title: string
  authorId: string
  slug: string
  image: FileList
  content: string
  type: TArticleType
  category: TArticleCategory
  published: boolean
}

export interface IArticleToUpdate {
  title?: string
  slug?: string
  image?: FileList
  content?: string
  type?: TArticleType
  category?: TArticleCategory
  published?: boolean
}

export interface IArticle {
  title: string
  slug: string
  image: {
    publicId: string
    url: string
    width: number
    height: number
  },
  content: string
  type: TArticleType
  category: TArticleCategory
  published: false,
  author: IAuthor
  createdAt: string
  updatedAt: string
  id: string
}

export interface IReturnArticles extends IFetchReturn {
  data: IArticle[]
}

export interface IReturnArticle extends IFetchReturn {
  data: IArticle
}
