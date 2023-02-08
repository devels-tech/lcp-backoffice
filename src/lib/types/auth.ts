/* eslint-disable no-unused-vars */
import { IFetchReturn } from './http'

export enum ERole {
  USER = 'USER',
  MEMBER_OF_CHURCH = 'MEMBER_OF_CHURCH',
  MEMBER_OF_MINISTRY = 'MEMBER_OF_MINISTRY',
  LEADER_OF_MINISTRY = 'LEADER_OF_MINISTRY',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN'
}

export interface IRole {
  title: ERole.USER |
  ERole.MEMBER_OF_CHURCH |
  ERole.MEMBER_OF_MINISTRY |
  ERole.LEADER_OF_MINISTRY |
  ERole.MODERATOR |
  ERole.ADMIN
  users: []
  createdAt: string
  updatedAt: string
  id: string
}

export interface IAuth {
  id: string
  email: string
  firstName: string
  lastName: string
  password: string
  isDeleted: boolean,
  picture: string | null
  birthDate: string | null
  profesion: string | null
  phone: string | null
  address: string | null
  ministries: []
  roles: IRole[]
  orders: []
  createdAt: string
  updatedAt: string
  accessToken: string
  refreshToken: string
}

export interface IReturnAuth extends IFetchReturn {
  data: IAuth
}
