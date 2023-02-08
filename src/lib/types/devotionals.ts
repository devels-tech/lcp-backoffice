import { IFetchReturn } from './http'

export interface IDevotionalToCreate {
  title: string
  file: File
  authorId: string
}

export interface IDevotionalToUpdate {
  title?: string
  file?: File
}

export interface IDevotional {
  id: string
  title: string
  file: {
    publicId: string
    url: string
  }
  createdAt: string
  updatedAt: string
}

export interface IReturnDevotionals extends IFetchReturn {
  data: IDevotional[]
}

export interface IReturnDevotional extends IFetchReturn {
  data: IDevotional
}
