import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getAllPosts } from 'lib/services/posts'
import { IArticle } from 'lib/types'

import { EmptyPageContent } from 'components/common/empty/EmptyPageContent'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { ArticleItem } from './ArticleItem'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'

export const ArticleList = () => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllPosts()

      if (error) {
        setIsLoading(false)
        handleFetchErrors(error.status, error.message)
        return
      }

      setArticles(data)
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) return <LoaderPage />

  if (!articles.length) {
    return (
      <EmptyPageContent label='Sin Contenido'>
        <Link href='/articulos/crear' className='text-blue-500 font-bold'>
        Crear Nuevo Artículo
        </Link>
      </EmptyPageContent>
    )
  }

  return (
    <ul className='w-full h-full basicList gap-x-6 gap-y-6'>
      {
        articles.map(post => (
          <ArticleItem
            key={post.id}
            {...post}
          />
        ))
      }
    </ul>
  )
}
