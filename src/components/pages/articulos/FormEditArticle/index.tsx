import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { IArticleToUpdate, IArticle, EArticleType, EArticleCategory } from 'lib/types'
import { updatePostById } from 'lib/services/posts'

import { InputBasic, InputSelectBasic, Toggle } from 'components/common/inputs'
import { MenuBar } from 'components/common/Editor/MenuBar'

import { Button } from 'components/common/Button'
import { UploadImage } from './UploadImage'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { slugify } from 'lib/utils/slugify'

export const FormEditArticle = ({ id, title, image, slug, category, type, content, published }: IArticle) => {
  const { register, handleSubmit, watch } = useForm<IArticleToUpdate>()
  const editor = useEditor({ content, extensions: [StarterKit, Image] })
  const [imageToUpload, setImageToUpload] = useState(null)
  const [, setIsLoading] = useState(false)
  const publishedWatcher = watch('published')
  const titleWatcher = watch('title')
  const router = useRouter()

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList[0], addUpdateIndex)
    setImageToUpload(imageList)
  }

  const onSubmit = async (dataForm: IArticleToUpdate) => {
    setIsLoading(true)

    const postToUpdate: IArticleToUpdate = {
      ...dataForm,
      content: editor.getHTML(),
      slug: slugify(dataForm.title),
      image: imageToUpload ? imageToUpload[0]?.file : null
    }

    const { error } = await updatePostById(id, postToUpdate)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setIsLoading(false)
    router.push('/articulos')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
      <div className='flex justify-end items-center'>
        <Toggle
          id='published'
          labelTruthy='Publicado'
          labelFalsy='No Publicado'
          stateWatcher={publishedWatcher}
          register={register}
          defaultChecked={published}
        />
      </div>

      <section className='w-full h-full flex flex-col sm:flex-row justify-between items-start gap-x-6'>
        <img
          src={image.url}
          height={image.height}
          width={image.width}
          alt={title}
          className='rounded-md mx-auto w-full sm:w-1/2 mt-4 sm:mt-0'
        />

        <div className='w-full sm:w-1/2 mt-4 sm:mt-0'>
          <UploadImage
            classes='w-full'
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
          defaultValue={title}
        />

        <div className='w-full'>
          <label htmlFor='slug'>
            Slug
          </label>

          <input
            {...register('slug')}
            id='slug'
            name='slug'
            type='text'
            disabled={true}
            placeholder='Slug del Artículo'
            value={slugify(titleWatcher || title)}
            defaultValue={slug}
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
          <option value={type}>{type}</option>
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
          <option value={category}>{category}</option>
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
        Editar Artículo
      </Button>
    </form>
  )
}
