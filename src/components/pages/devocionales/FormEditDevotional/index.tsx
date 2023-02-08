import { useForm } from 'react-hook-form'

import { useRouter } from 'next/router'
import { useState } from 'react'

import { IBannerToUpdate, IDevotional, IDevotionalToUpdate } from 'lib/types'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { updateBannerById } from 'lib/services/banners'

import { InputBasic } from 'components/common/inputs/InputBasic'
import { Button } from 'components/common/Button'

export const FormEditDevotional = ({ id, title, file }: IDevotional) => {
  const { register, handleSubmit } = useForm<IDevotionalToUpdate>()
  const [imageToUpload] = useState(null)
  const [, setIsLoading] = useState(false)
  const router = useRouter()

  // const onChange = (imageList, addUpdateIndex) => {
  //   console.log(imageList[0], addUpdateIndex)
  //   setImageToUpload(imageList)
  // }

  const onSubmit = async (dataForm: IDevotionalToUpdate) => {
    // setIsLoading(true)

    // const bannerToUpdate: IDevotionalToUpdate = {
    //   title: dataForm.title,
    //   file: null
    // }

    // const { error } = await updateBannerById(id, bannerToUpdate)

    // if (error) {
    //   setIsLoading(false)
    //   handleFetchErrors(error.status, error.message)
    //   return
    // }

    // setIsLoading(false)
    // router.push('/banners')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
      <section className='mt-4'>
        <InputBasic
          id='title'
          type='text'
          label='Titulo'
          register={register}
          rules={{ required: false }}
          placeholder='Titulo'
          defaultValue={title}
        />
      </section>

      <a
        download
        href={ file.url }
        className='inline-block bg-black rounded-md px-4 py-1.5 text-white uppercase font-semibold text-center text-sm'
      >
        Ver Archivo
      </a>

      <Button type='submit' classes='mt-4 w-full'>
        Editar Devocional
      </Button>
    </form>
  )
}
