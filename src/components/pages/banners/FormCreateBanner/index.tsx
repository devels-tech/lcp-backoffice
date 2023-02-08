
import type { ImageListType } from 'react-images-uploading'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { createBanner, uploadImageOfBannerById } from 'lib/services/banners'
import { IBannerToCreate } from 'lib/types'
import { rulesForm } from './rulesForm'
import { config } from 'config'

import { Spinner } from 'components/layout/loaders/Spinner'
import { InputBasic } from 'components/common/inputs/InputBasic'
import { Button } from 'components/common/Button'
import { UploadImage } from './UploadImage'

interface ILoadingBannerData {
  type: 'UPDATE_BANNER_TITLE' | 'UPLOADING_IMAGE_MOBILE' | 'UPLOADING_IMAGE_DESKTOP'
  status: boolean
}

export const FormCreateBanner = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IBannerToCreate>()
  const [isLoading, setIsLoading] = useState<ILoadingBannerData>({ type: null, status: false })
  const [bannerImg, setBannerImg] = useState({ mobile: [], desktop: [] })
  const router = useRouter()

  const onChange = (image: ImageListType, addUpdateIndex?: number[], type?: 'mobile' | 'desktop') => {
    if (type === 'mobile') { setBannerImg(prevState => ({ ...prevState, mobile: image })) }
    if (type === 'desktop') { setBannerImg(prevState => ({ ...prevState, desktop: image })) }
  }

  const onSubmit = async (dataForm: IBannerToCreate) => {
    setIsLoading({ type: 'UPDATE_BANNER_TITLE', status: true })

    if (!bannerImg.mobile || !bannerImg.mobile[0]) {
      toast('La imagen mobile es requerida', { type: 'warning' })
      setIsLoading({ type: null, status: false })
      return
    }

    if (!bannerImg.desktop || !bannerImg.desktop[0]) {
      toast('La imagen desktop es requerida', { type: 'warning' })
      setIsLoading({ type: null, status: false })
      return
    }

    if (bannerImg.mobile[0]?.file?.size >= config.FILE_LIMITS.BANNERS.IMAGE_SIZE) {
      toast('La imagen para mobile debe pesar menos de 2MB', { type: 'warning' })
      setIsLoading({ type: null, status: false })
      return
    }

    if (bannerImg.desktop[0]?.file?.size >= config.FILE_LIMITS.BANNERS.IMAGE_SIZE) {
      toast('La imagen para desktop debe pesar menos de 2MB', { type: 'warning' })
      setIsLoading({ type: null, status: false })
      return
    }

    const bannerToCreate: IBannerToCreate = { title: dataForm.title }

    const { data: bannerCreated, error: bannerError } = await createBanner(bannerToCreate)

    if (bannerError) {
      setIsLoading({ type: null, status: false })
      handleFetchErrors(bannerError.status, bannerError.message)
      return
    }

    setIsLoading({ type: 'UPLOADING_IMAGE_MOBILE', status: true })

    const { error: imageMobileError } = await uploadImageOfBannerById(
      bannerCreated.id,
      'mobile',
      bannerImg.mobile[0]?.file
    )

    if (imageMobileError) {
      setIsLoading({ type: null, status: false })
      handleFetchErrors(imageMobileError.status, imageMobileError.message)
      return
    }

    setIsLoading({ type: 'UPLOADING_IMAGE_DESKTOP', status: true })

    setTimeout(async () => {
      const { error: imageDesktopError } = await uploadImageOfBannerById(
        bannerCreated.id,
        'desktop',
        bannerImg.desktop[0]?.file
      )

      if (imageDesktopError) {
        setIsLoading({ type: null, status: false })
        handleFetchErrors(imageDesktopError.status, imageDesktopError.message)
      }

      setIsLoading({ type: null, status: false })
      router.push('/banners')
    }, 1000)
  }

  if (isLoading.type === 'UPDATE_BANNER_TITLE' && isLoading.status) {
    return (
      <div className='w-full h-[60vh] flex flex-col items-center justify-center'>
        <span className='text-2xl font-black dark:text-white'>Creando banner</span>
        <Spinner classes='mt-1' />
      </div>
    )
  }

  if (isLoading.type === 'UPLOADING_IMAGE_MOBILE' && isLoading.status) {
    return (
      <div className='w-full h-[60vh] flex flex-col items-center justify-center'>
        <span className='text-2xl font-black dark:text-white'>Subiendo imagen mobile</span>
        <Spinner classes='mt-1' />
      </div>
    )
  }

  if (isLoading.type === 'UPLOADING_IMAGE_DESKTOP' && isLoading.status) {
    return (
      <div className='w-full h-[60vh] flex flex-col items-center justify-center'>
        <span className='text-2xl font-black dark:text-white'>Subiendo imagen desktop</span>
        <Spinner classes='mt-1' />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-3xl mx-auto mt-2'>
      <section className='flex flex-col md:flex-row justify-between items-center gap-x-6'>
        <InputBasic
          id='title'
          type='text'
          register={register}
          rules={{ ...rulesForm.title }}
          label='Título del Banner'
          placeholder='Título del Banner'
          errors={errors}
        />
      </section>

      <section className='flex justify-between items-start gap-x-6'>
        <UploadImage
          imageToUpload={bannerImg.mobile}
          onChange={onChange}
          type='mobile'
        />

        <UploadImage
          imageToUpload={bannerImg.desktop}
          onChange={onChange}
          type='desktop'
        />
      </section>

      <Button type='submit' classes='mt-4 w-full'>
        Crear Banner
      </Button>
    </form>
  )
}
