
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

// import { createBanner } from 'lib/services/banners'
import { EArticleCategory, EArticleType, IAuthor, IArticleToCreate } from 'lib/types'

import { InputBasic, InputSelectBasic } from 'components/common/inputs/InputBasic'
// import { SpinnerLoader } from 'components/common/icons'
import { Button } from 'components/common/Button'
import { UploadImage } from './UploadImage'
import { EditorContent, useEditor } from '@tiptap/react'
import { MenuBar } from 'components/common/Editor/MenuBar'
import { Toggle } from 'components/common/inputs'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { slugify } from 'lib/utils/slugify'
import { getAllAuthors } from 'lib/services/authors'
import { useAuthStore } from 'lib/store/Auth'
import { createPost } from 'lib/services/posts'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'

export const FormCreateArticle = () => {
  const { register, handleSubmit, watch } = useForm<IArticleToCreate>()
  const editor = useEditor({ content: '', extensions: [StarterKit, Image] })
  const [imageToUpload, setImageToUpload] = useState(null)
  const [authors, setAuthors] = useState<IAuthor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const publishedWatcher = watch('published')
  const titleWatcher = watch('title')
  const { auth } = useAuthStore()
  const router = useRouter()

  const onChange = (imageList, addUpdateIndex) => {
    // console.log(imageList[0], addUpdateIndex)
    setImageToUpload(imageList)
  }

  const onSubmit = async (dataForm: IArticleToCreate) => {
    setIsLoading(true)

    if (!imageToUpload || !imageToUpload[0]) {
      toast('La imagen es requerida', { type: 'error' })
      setIsLoading(false)
      return
    }

    const authorFinded = authors.find(author => author.user.id === auth.id)

    if (!authorFinded) {
      toast('No tienes permisos de autor', { type: 'error' })
      setIsLoading(false)
      return
    }

    console.log('dataForm', dataForm)

    const postToCreate: IArticleToCreate = {
      ...dataForm,
      image: imageToUpload[0]?.file,
      authorId: authorFinded.id,
      content: editor.getHTML(),
      slug: slugify(dataForm.title)
    }

    console.log('postToCreate', postToCreate)

    const { error } = await createPost(postToCreate)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setIsLoading(false)
    router.push('/articulos')
  }

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllAuthors()

      if (error) return toast('Hubo un error', { type: 'error' })

      setAuthors(data)
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) return <LoaderPage />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
      <div className='flex flex-wrap justify-between items-center'>
        <Toggle
          id='published'
          labelTruthy='Publicado'
          labelFalsy='No Publicado'
          stateWatcher={publishedWatcher}
          register={register}
          defaultChecked={false}
          containerClasses='w-1/2'
        />

        <InputSelectBasic
          id='authorId'
          label='Autor'
          rules={{ required: true }}
          register={register}
          containerClasses='w-1/2'
        >
          {
            authors.map((author, idx) => {
              if (idx === 0) {
                return (
                  <option
                    key={author.id}
                    value={author.id}
                    selected
                  >
                    { author.user.firstName } { author.user.lastName }
                  </option>
                )
              } else {
                return (
                  <option
                    key={author.id}
                    value={author.id}
                  >
                    { author.user.firstName } { author.user.lastName }
                  </option>
                )
              }
            })
          }
        </InputSelectBasic>
      </div>

      <section className='w-full h-full flex justify-start items-start'>
        <div className='w-full mt-4 sm:mt-0'>
          <UploadImage
            imageToUpload={imageToUpload}
            onChange={onChange}
          />
        </div>
      </section>

      <section className='mt-4 flex gap-x-6'>
        <InputBasic
          id='title'
          type='text'
          label='Titulo'
          register={register}
          rules={{ required: false }}
          placeholder='Titulo'
        />

        <div className='w-full relative'>
          <label htmlFor='slug'>
            Slug
          </label>

          <div className='wrapperDisabled'>&nbsp;</div>

          <input
            {...register('slug')}
            id='slug'
            name='slug'
            type='text'
            value={slugify(titleWatcher || '')}
            placeholder='Slug del Artículo'
            className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-300 leading-8 transition-colors duration-200 ease-in-out'
          />
        </div>
      </section>

      <section className='flex w-full gap-x-6'>
        <InputSelectBasic
          id='type'
          label='Tipo de Artículo'
          rules={{ required: true }}
          register={register}
        >
          <option value={EArticleType.ALMA}>{EArticleType.ALMA}</option>
          <option value={EArticleType.CUERPO}>{EArticleType.CUERPO}</option>
          <option value={EArticleType.ESPIRITU}>{EArticleType.ESPIRITU}</option>
        </InputSelectBasic>

        <InputSelectBasic
          id='category'
          label='Categoria del Artículo'
          rules={{ required: true }}
          register={register}
        >
          <option value={EArticleCategory.DEPORTES}>{EArticleCategory.DEPORTES}</option>
          <option value={EArticleCategory.NUTRICION}>{EArticleCategory.NUTRICION}</option>
          <option value={EArticleCategory.PSICOLOGIA}>{EArticleCategory.PSICOLOGIA}</option>
          <option value={EArticleCategory.REFLEXIONES}>{EArticleCategory.REFLEXIONES}</option>
        </InputSelectBasic>
      </section>

      <section className='mt-4'>
        <span>Contenido</span>

        <div className='mt-2'></div>

        <div>
          <MenuBar editor={editor} />

          <EditorContent
            className='editor-container'
            editor={editor}
          />
        </div>
      </section>

      <Button type='submit' classes='mt-4 w-full'>
        Crear Artículo
      </Button>
    </form>
  )
}
