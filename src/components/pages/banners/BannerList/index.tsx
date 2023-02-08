import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getAllBanners } from 'lib/services/banners'
import { IBanner } from 'lib/types'

import { EmptyPageContent } from 'components/common/empty/EmptyPageContent'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { BannerItem } from './BannerItem'

export const BannerList = () => {
  const [banners, setBanners] = useState<IBanner[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshBanners = async () => {
    setIsLoading(true)
    const { data, error } = await getAllBanners()

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setBanners(data)
    setIsLoading(false)
  }

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllBanners()

      if (error) {
        setIsLoading(false)
        handleFetchErrors(error.status, error.message)
        return
      }

      setBanners(data)
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) return <LoaderPage />

  if (!banners.length) {
    return (
      <EmptyPageContent label='Sin Contenido'>
        <Link href='/banners/crear' className='text-blue-500 font-bold'>
        Crear Nuevo Banner
        </Link>
      </EmptyPageContent>
    )
  }

  return (
    <ul className='w-full h-full basicList-banners gap-x-6 gap-y-6'>
      {
        banners.map(banner =>
          <BannerItem
            key={banner.id}
            {...banner}
            refreshBanners={refreshBanners}
            setIsLoading={setIsLoading}
          />
        )
      }
    </ul>
  )
}
