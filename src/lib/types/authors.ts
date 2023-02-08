import { IFetchReturn } from './http'

export interface IAuthor {
  posts: string[],
  devotionals: string[],
  user: {
      picture: string
      roles: string[],
      firstName: string
      lastName: string
      email: string
      phone: string
      address: string
      birthDate: string
      profesion: string
      isDeleted: boolean
      password: string
      id: string
  },
  createdAt: string
  updatedAt: string
  id: string
}

export interface IUserUpgradeToAuthor {
  id: string
}

export interface IReturnAuthors extends IFetchReturn {
  data: IAuthor[]
}

export interface IReturnAuthor extends IFetchReturn {
  data: IAuthor
}
