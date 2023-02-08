/* eslint-disable no-unused-vars */
import { IFetchReturn } from './http'

export type TBannerType = 'MOBILE' | 'DESKTOP'

export enum EBannerType {
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP'
}

export interface IBannerToCreate {
  title: string
}

export interface IBannerToUpdate {
  title: string
}

export interface IBanner {
  id: string
  title: string
  type: TBannerType
  image: {
    mobile: {
      publicId: string
      url: string
      width: number
      height: number
    }
    desktop: {
      publicId: string
      url: string
      width: number
      height: number
    }
  }
  createdAt: string
  updatedAt: string
}

export interface IReturnBanners extends IFetchReturn {
  data: IBanner[]
}

export interface IReturnBanner extends IFetchReturn {
  data: IBanner
}
