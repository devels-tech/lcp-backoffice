import { useEffect, useState } from 'react'
// import { getStatus } from 'lib/services/firebase/utils/shop'

export const useGetStatus = () => {
  const [status] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error] = useState({ state: false, message: '' })

  useEffect(() => {
    // getStatus()
    //   .then(({ status }) => setStatus(status))
    //   .catch(err => setError({ state: true, message: JSON.stringify(err) }))

    setIsLoading(false)
  }, [])

  return {
    status,
    statusIsLoading: isLoading,
    statusError: error
  }
}
