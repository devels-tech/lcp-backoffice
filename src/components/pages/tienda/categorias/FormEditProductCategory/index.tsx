
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { IProductCategory, IProductCategoryToUpdate } from 'lib/types'

import { InputBasic } from 'components/common/inputs'
import { Button } from 'components/common/Button'
import { slugify } from 'lib/utils/slugify'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { updateProductCategoryById } from 'lib/services/shop/productCategories'

export const FormEditProductCategory = ({ id, title, slug, description }: IProductCategory) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IProductCategoryToUpdate>()
  const [isLoading, setIsLoading] = useState(false)
  const titleWatcher = watch('title')
  const router = useRouter()

  const onSubmit = async (dataForm: IProductCategoryToUpdate) => {
    setIsLoading(true)

    const productCategoryToUpdate: IProductCategoryToUpdate = {
      ...dataForm,
      slug: slugify(titleWatcher)
    }

    console.log('productCategoryToUpdate', productCategoryToUpdate)

    const { error } = await updateProductCategoryById(id, productCategoryToUpdate)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setIsLoading(false)
    router.push('/tienda/categorias')
  }

  if (isLoading) return <LoaderPage />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
      <section className='mt-4 flex gap-x-6'>
        <InputBasic
          id='title'
          type='text'
          label='Titulo'
          register={register}
          rules={{ required: false }}
          placeholder='Titulo'
          defaultValue={title}
          errors={errors}
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
            defaultValue={slug}
            value={slugify(titleWatcher || slug || '')}
            className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-300 leading-8 transition-colors duration-200 ease-in-out'
          />
        </div>
      </section>

      <section className='mt-4'>
        <InputBasic
          id='description'
          type='text'
          label='Descripción'
          register={register}
          rules={{ required: false }}
          placeholder='Descripción'
          defaultValue={description}
        />
      </section>

      <Button type='submit' classes='mt-4 w-full'>
        Editar Categoria
      </Button>
    </form>
  )
}
