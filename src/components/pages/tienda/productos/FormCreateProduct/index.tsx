
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { getAllProductsCategories } from 'lib/services/shop/productCategories'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { handleOnlyNumbers } from 'lib/utils/handleOnlyNumbers'
import { IProductCategory, IProductToCreate } from 'lib/types'
import { createProduct } from 'lib/services/shop/products'
import { slugify } from 'lib/utils/slugify'

import { InputBasic, InputSelectBasic } from 'components/common/inputs/InputBasic'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { Toggle } from 'components/common/inputs'
import { Button } from 'components/common/Button'
import { UploadImage } from './UploadImage'

export const FormCreateProduct = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IProductToCreate>()
  const [productCategories, setProductCategories] = useState<IProductCategory[]>([])
  const [imageToUpload, setImageToUpload] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const publishedWatcher = watch('published')
  const titleWatcher = watch('title')
  const router = useRouter()

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList[0], addUpdateIndex)
    setImageToUpload(imageList)
  }

  const onSubmit = async (dataForm: IProductToCreate) => {
    setIsLoading(true)

    if (!imageToUpload) {
      toast('La imagen es requerida', { type: 'error' })
      setIsLoading(false)
      return
    }

    const productToCreate: IProductToCreate = {
      ...dataForm,
      slug: slugify(titleWatcher),
      image: imageToUpload[0]?.file
    }

    console.log('productToCreate', productToCreate)

    const { error } = await createProduct(productToCreate)

    if (error) {
      toast('Hubo un error', { type: 'error' })
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    router.push('/tienda/productos')
  }

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllProductsCategories()

      if (error) {
        setIsLoading(false)
        handleFetchErrors(error.status, error.message)
        return
      }

      setProductCategories(data)
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) return <LoaderPage />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
      <div className='flex justify-end items-center'>
        <Toggle
          id='published'
          labelTruthy='Publicado'
          labelFalsy='No Publicado'
          stateWatcher={publishedWatcher}
          register={register}
          defaultChecked={false}
        />
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
          errors={errors}
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
        <InputBasic
          id='price'
          type='text'
          label='Precio'
          register={register}
          rules={{ required: false, maxLength: { value: 6, message: '* Maximo 6 caracteres' } }}
          placeholder='Precio'
          onKeyPress={handleOnlyNumbers}
          errors={errors}
        />

        <InputSelectBasic
          id='categoryId'
          label='Categoria del Artículo'
          rules={{ required: true }}
          register={register}
        >
          {
            productCategories.map(productCategory => (
              <option key={productCategory.id} value={ productCategory.id }>{ productCategory.title }</option>
            ))
          }
        </InputSelectBasic>
      </section>

      <section className='mt-4'>
        <InputBasic
          id='description'
          type='text'
          label='Descripción'
          register={register}
          rules={{ required: false }}
          placeholder='Descripción'
          errors={errors}
        />
      </section>

      <Button type='submit' classes='mt-4 w-full'>
        Crear Producto
      </Button>
    </form>
  )
}
