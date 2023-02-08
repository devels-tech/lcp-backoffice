import { IArticleToCreate, IArticleToUpdate, IReturnArticle, IReturnArticles } from 'lib/types'

export const getAllPosts = async (): Promise<IReturnArticles> => {
  const res = await fetch('/api/posts')
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

export const getPostById = async (id: string): Promise<IReturnArticle> => {
  const res = await fetch(`/api/posts/${id}`)
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

export const createPost = async (post: IArticleToCreate): Promise<IReturnArticle> => {
  const formData = new FormData()
  const entries = Object.entries(post)

  entries.forEach(([key, value]) => {
    if (key === 'image') {
      if (!value) return
    }

    formData.append(key, value)
  })

  const options: RequestInit = { method: 'POST', body: formData }

  const res = await fetch('/api/posts', options)
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

export const updatePostById = async (id: string, post: IArticleToUpdate): Promise<IReturnArticle> => {
  const formData = new FormData()
  const entries = Object.entries(post)

  entries.forEach(([key, value]) => {
    if (key === 'image') {
      if (!value) return
    }

    formData.append(key, value)
  })

  const options: RequestInit = { method: 'PUT', body: formData }

  const res = await fetch(`/api/posts/${id}`, options)
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

export const deletePostById = async (id: string): Promise<IReturnArticle> => {
  const options: RequestInit = { method: 'DELETE' }

  const res = await fetch(`/api/posts/${id}`, options)
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
