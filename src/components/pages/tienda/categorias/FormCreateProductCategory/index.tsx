
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { IProductCategoryToCreate } from 'lib/types'
import { slugify } from 'lib/utils/slugify'

import { InputBasic } from 'components/common/inputs/InputBasic'
import { Button } from 'components/common/Button'

interface IFormCreateProductCategoryProps {
  createProductCategory: (product: IProductCategoryToCreate) => Promise<void>
}

export const FormCreateProductCategory = ({ createProductCategory }: IFormCreateProductCategoryProps) => {
  const { register, handleSubmit, watch } = useForm<IProductCategoryToCreate>()
  const titleWatcher = watch('title')
  const router = useRouter()

  const onSubmit = async (dataForm: IProductCategoryToCreate) => {
    await createProductCategory({
      ...dataForm,
      slug: slugify(titleWatcher)
    })
    router.push('/tienda/categorias')
  }

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

      <section className='mt-4'>
        <InputBasic
          id='description'
          type='text'
          label='Descripción'
          register={register}
          rules={{ required: false }}
          placeholder='Descripción'
        />
      </section>

      <Button type='submit' classes='mt-4 w-full'>
        Crear Categoria
      </Button>
    </form>
  )
}
