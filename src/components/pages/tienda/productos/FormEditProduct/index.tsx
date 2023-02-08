
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getAllProductsCategories } from 'lib/services/shop/productCategories'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { updateProductById } from 'lib/services/shop/products'
import { IProduct, IProductToUpdate } from 'lib/types'

import { InputBasic, InputSelectBasic, Toggle } from 'components/common/inputs'

import { Button } from 'components/common/Button'
import { UploadImage } from './UploadImage'
import { slugify } from 'lib/utils/slugify'
import { handleOnlyNumbers } from 'lib/utils/handleOnlyNumbers'
import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { moveItemToFirstPosition } from 'lib/utils/moveItemOfArray'

export const FormEditProduct = ({ id, title, image, slug, category, description, price, published }: IProduct) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IProductToUpdate>()
  const [productCategories, setProductCategories] = useState([])
  const [imageToUpload, setImageToUpload] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const publishedWatcher = watch('published')
  const titleWatcher = watch('title')
  const router = useRouter()

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList[0], addUpdateIndex)
    setImageToUpload(imageList)
  }

  const onSubmit = async (dataForm: IProductToUpdate) => {
    setIsLoading(true)

    const productToUpdate: IProductToUpdate = {
      ...dataForm,
      slug,
      image: imageToUpload ? imageToUpload[0]?.file : null
    }

    const { error } = await updateProductById(id, productToUpdate)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
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

      const categoryDouplicatedIdx = data.findIndex(element => element.id === category.id)
      const categoriesOrdered = moveItemToFirstPosition(data, categoryDouplicatedIdx)

      setProductCategories(categoriesOrdered)
      setIsLoading(false)
    })()
  }, [category])

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
          defaultChecked={published}
        />
      </div>

      <section className='w-full h-full flex flex-col sm:flex-row justify-between items-start gap-x-6'>
        <img
          src={image.url}
          height={image.height}
          width={image.width}
          alt={title}
          className='rounded-md mx-auto w-full sm:w-1/2 mt-4 sm:mt-0 h-[313px] object-cover'
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
            value={slugify(titleWatcher || '')}
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
          defaultValue={price}
          onKeyPress={handleOnlyNumbers}
          errors={errors}
        />

        <InputSelectBasic
          id='categoryId'
          label='Categoria del Artículo'
          rules={{ required: true }}
          register={register}
        >
          {/* <option value={ category.id }>{ category.title }</option> */}
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
          defaultValue={description}
          errors={errors}
        />
      </section>

      <Button type='submit' classes='mt-4 w-full'>
        Editar Producto
      </Button>
    </form>
  )
}
