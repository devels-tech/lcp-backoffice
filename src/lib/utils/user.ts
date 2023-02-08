
import Cookies from 'js-cookie'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const registerUserFetcher = async (url, username, email, password) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  })

  if (!res.ok) {
    return {
      data: null,
      error: {
        message: res.json(),
        status: res.status
      }
    }
  }

  const data = await res.json()

  return { data, error: null }
}

const loginUserFetcher = async (url, identifier, password) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ identifier, password })
  })

  if (!res.ok) {
    return {
      data: null,
      error: {
        message: res.json(),
        status: res.status
      }
    }
  }

  const data = await res.json()

  return { data, error: null }
}

const getUserFetcher = async (token) => {
  const res = await fetch(`${SERVER_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    return {
      data: null,
      error: {
        message: res.json(),
        status: res.status
      }
    }
  }

  const data = await res.json()

  return { data, error: null }
}

// Registrar a un nuevo usuario:
export const registerUser = async (username, email, password) => {
  const { data, error } = await registerUserFetcher(
    `${SERVER_URL}/auth/local/register`,
    username,
    email,
    password
  )

  Cookies.set('token', data.jwt)

  if (Cookies.get('logout')) {
    Cookies.remove('logout')
  }

  return { data, error }
}

// Iniciar sesión a un usuario
export const loginUser = async (
  identifier: string,
  password: string,
  rememberMe: boolean
) => {
  const { data, error } = await loginUserFetcher(
    `${SERVER_URL}/auth/local`,
    identifier,
    password
  )

  if (error) return { data, error }

  Cookies.set('token', data.jwt)

  if (Cookies.get('logout')) {
    Cookies.remove('logout')
  }

  return { data, error }
}

// Obtener usuario con token
export const getUser = async (token) => {
  const { data, error } = await getUserFetcher(token)

  if (Cookies.get('logout')) {
    Cookies.remove('logout')
  }

  return { data, error }
}

// Cerrar sesión de un usuario
export const logoutUser = () => {
  Cookies.remove('token')
  Cookies.set('logout', Date().toString())
}
