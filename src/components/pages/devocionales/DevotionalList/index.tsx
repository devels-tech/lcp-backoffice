import { useEffect, useState } from 'react'
import Link from 'next/link'

import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { getAllDevotionals } from 'lib/services/devotionals'
import { IDevotional } from 'lib/types'

import { EmptyPageContent } from 'components/common/empty/EmptyPageContent'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { DevotionalItem } from './DevotionalItem'

export const DevotionalList = () => {
  const [devotionals, setDevotionals] = useState<IDevotional[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshDevotionals = async () => {
    setIsLoading(true)
    const { data, error } = await getAllDevotionals()

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setDevotionals(data)
    setIsLoading(false)
  }

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllDevotionals()

      if (error) {
        setIsLoading(false)
        handleFetchErrors(error.status, error.message)
        return
      }

      setDevotionals(data)
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) return <LoaderPage />

  if (!devotionals.length) {
    return (
      <EmptyPageContent label='Sin Contenido'>
        <Link href='/devocionales/crear' className='text-blue-500 font-bold'>
        Crear Nuevo Devocional
        </Link>
      </EmptyPageContent>
    )
  }

  return (
    <ul className='w-full h-full basicList gap-x-6 gap-y-6'>
      {
        devotionals.map(devotional => (
          <DevotionalItem
            {...devotional}
            key={devotional.id}
            refreshDevotionals={refreshDevotionals}
            setIsLoading={setIsLoading}
          />
        ))
      }
    </ul>
  )
}
