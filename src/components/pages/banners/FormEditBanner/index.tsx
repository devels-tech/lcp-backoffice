
import type { ImageListType } from 'react-images-uploading'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { updateBannerById, uploadImageOfBannerById } from 'lib/services/banners'
import { IBanner, IBannerToUpdate } from 'lib/types'
import { config } from 'config'

import { Spinner } from 'components/layout/loaders/Spinner'
import { InputBasic } from 'components/common/inputs/InputBasic'
import { Button } from 'components/common/Button'
import { UploadImage } from './UploadImage'
import { rulesForm } from './rulesForm'

interface ILoadingBannerData {
  type: 'UPDATE_BANNER_TITLE' | 'UPLOADING_IMAGE_MOBILE' | 'UPLOADING_IMAGE_DESKTOP'
  status: boolean
}

export const FormEditBanner = ({ id, title, image }: IBanner) => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<IBannerToUpdate>()
  const [isLoading, setIsLoading] = useState<ILoadingBannerData>({ type: null, status: false })
  const [imageToUpload, setImageToUpload] = useState<{ mobile: any[], desktop: any[] }>({ mobile: [], desktop: [] })

  const onChange = (image: ImageListType, addUpdateIndex?: number[], type?: 'mobile' | 'desktop') => {
    if (type === 'mobile') { setImageToUpload(prevState => ({ ...prevState, mobile: image })) }
    if (type === 'desktop') { setImageToUpload(prevState => ({ ...prevState, desktop: image })) }
  }

  const onSubmit = async (dataForm: IBannerToUpdate) => {
    if (dataForm.title !== title) {
      setIsLoading({ type: 'UPDATE_BANNER_TITLE', status: true })

      const bannerToUpdate: IBannerToUpdate = { title: dataForm.title }

      const { error: bannerError } = await updateBannerById(id, bannerToUpdate)

      if (bannerError) {
        setIsLoading({ type: null, status: false })
        handleFetchErrors(bannerError.status, bannerError.message)
      }
    }

    if (imageToUpload.mobile[0]?.file) { // image mobile has changed
      if (!imageToUpload.mobile || !imageToUpload.mobile[0]) {
        toast('La imagen mobile es requerida', { type: 'warning' })
        setIsLoading({ type: null, status: false })
        return
      }

      if (imageToUpload.mobile[0]?.file?.size >= config.FILE_LIMITS.BANNERS.IMAGE_SIZE) {
        toast('La imagen para mobile debe pesar menos de 2MB', { type: 'warning' })
        setIsLoading({ type: null, status: false })
        return
      }

      setIsLoading({ type: 'UPLOADING_IMAGE_MOBILE', status: true })

      const { error: imageMobileError } = await uploadImageOfBannerById(
        id,
        'mobile',
        imageToUpload.mobile[0]?.file
      )

      if (imageMobileError) {
        setIsLoading({ type: null, status: false })
        handleFetchErrors(imageMobileError.status, imageMobileError.message)
      }

      setIsLoading({ type: null, status: false })
    }

    if (imageToUpload.desktop[0]?.file) { // image desktop has changed
      if (!imageToUpload.desktop || !imageToUpload.desktop[0]) {
        toast('La imagen desktop es requerida', { type: 'warning' })
        setIsLoading({ type: null, status: false })
        return
      }

      if (imageToUpload.desktop[0]?.file?.size >= config.FILE_LIMITS.BANNERS.IMAGE_SIZE) {
        toast('La imagen para desktop debe pesar menos de 2MB', { type: 'warning' })
        setIsLoading({ type: null, status: false })
        return
      }

      setIsLoading({ type: 'UPLOADING_IMAGE_DESKTOP', status: true })

      setTimeout(async () => {
        const { error: imageDesktopError } = await uploadImageOfBannerById(
          id,
          'desktop',
          imageToUpload.desktop[0]?.file
        )

        if (imageDesktopError) {
          setIsLoading({ type: null, status: false })
          handleFetchErrors(imageDesktopError.status, imageDesktopError.message)
        }

        setIsLoading({ type: null, status: false })
      }, 1000)
    }
  }

  useEffect(() => {
    setImageToUpload({ mobile: [{ data_url: image.mobile.url }], desktop: [{ data_url: image.desktop.url }] })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading.type === 'UPDATE_BANNER_TITLE' && isLoading.status) {
    return (
      <div className='w-full h-screen-[61vh] flex flex-col items-center justify-center'>
        <span className='text-2xl font-black dark:text-white'>Actualizando banner</span>
        <Spinner classes='mt-1' />
      </div>
    )
  }

  if (isLoading.type === 'UPLOADING_IMAGE_MOBILE' && isLoading.status) {
    return (
      <div className='w-full h-screen-[61vh] flex flex-col items-center justify-center'>
        <span className='text-2xl font-black dark:text-white'>Subiendo imagen mobile</span>
        <Spinner classes='mt-1' />
      </div>
    )
  }

  if (isLoading.type === 'UPLOADING_IMAGE_DESKTOP' && isLoading.status) {
    return (
      <div className='w-full h-screen-[61vh] flex flex-col items-center justify-center'>
        <span className='text-2xl font-black dark:text-white'>Subiendo imagen desktop</span>
        <Spinner classes='mt-1' />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
      <InputBasic
        id='title'
        type='text'
        label='Titulo'
        register={register}
        rules={{ ...rulesForm.title }}
        placeholder='Titulo'
        defaultValue={title}
        errors={errors}
      />

      <section className='flex justify-between items-start gap-x-6'>
        <UploadImage
          imageToUpload={imageToUpload.mobile}
          onChange={onChange}
          type='mobile'
        />

        <UploadImage
          imageToUpload={imageToUpload.desktop}
          onChange={onChange}
          type='desktop'
        />
      </section>

      <Button type='submit' classes='mt-4 w-full'>
        Actualizar Banner
      </Button>
    </form>
  )
}
