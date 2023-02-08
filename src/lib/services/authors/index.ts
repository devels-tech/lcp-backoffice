import { IReturnAuthors, IReturnAuthor } from 'lib/types'

export const getAllAuthors = async (): Promise<IReturnAuthors> => {
  const res = await fetch('/api/authors')
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

export const getAuthorById = async (id: string): Promise<IReturnAuthor> => {
  const res = await fetch(`/api/authors/${id}`)
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

export const upgradeUserToAuthor = async (userId: string): Promise<IReturnAuthors> => {
  const options: RequestInit = { method: 'POST' }

  const res = await fetch(`/api/authors/${userId}`, options)
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
