
import usePortal from 'react-cool-portal'
import { toast } from 'react-toastify'

import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { Dispatch, IBanner, SetStateAction } from 'lib/types'
import { deleteBannerById } from 'lib/services/banners'

import { Button, LinkAsButton } from 'components/common/Button'
import { Modal } from 'components/layout/Modal'

interface IBannerItemProps extends IBanner {
  setIsLoading: Dispatch<SetStateAction<boolean>>
  refreshBanners: () => Promise<void>
}

export const BannerItem = ({ id, title, image, refreshBanners, setIsLoading }: IBannerItemProps) => {
  const { Portal, show, hide } = usePortal({ defaultShow: false })

  const deleteBanner = async () => {
    hide()
    setIsLoading(true)
    const { error } = await deleteBannerById(id)

    if (error) {
      hide()
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    await refreshBanners()
    toast('Banner eliminado exitosamente', { type: 'success' })
  }

  return (
    <>
      <Modal Portal={Portal} hide={hide}>
        <div className='w-full flex gap-x-2 justify-start items-end pt-2 text-sm'>
          <Button onClick={hide} classes='w-full text-white'>
            Cancelar
          </Button>

          <Button onClick={deleteBanner} classes='w-full text-white'>
            Confirmar
          </Button>
        </div>
      </Modal>

      <li className='bg-slate-100 border-2 border-gray-300 dark:bg-[#1a1a1a] dark:border-gray-500 rounded-md p-3'>
        <h6 className='font-bold text-lg dark:text-white'>{title}</h6>

        <section className='flex flex-col sm:flex-row justify-between items-center gap-x-4 mt-2'>
          <div className='w-1/2'>
            <label htmlFor='bannerMobile' className='font-bold text-sm dark:text-[#a1a1a1]'>
              Mobile
            </label>

            <img
              id='bannerMobile'
              src={image.mobile.url}
              height={image.mobile.height}
              width={image.mobile.width}
              alt={title}
              className='rounded-md object-contain mx-auto h-[176px]'
            />
          </div>

          <div className='w-1/2'>
            <label htmlFor='bannerDesktop' className='font-bold text-sm dark:text-[#a1a1a1]'>
              Desktop
            </label>

            <img
              id='bannerDesktop'
              src={image.desktop.url}
              height={image.desktop.height}
              width={image.desktop.width}
              alt={title}
              className='rounded-md object-contain mx-auto h-[176px]'
            />
          </div>
        </section>

        <div className='w-full flex gap-x-2 justify-start items-end pt-2 text-sm'>
          <LinkAsButton to={`/banners/${id}`} classes='w-full text-center'>
            Editar
          </LinkAsButton>

          <Button onClick={show} classes='w-full'>
            Eliminar
          </Button>
        </div>
      </li>
    </>
  )
}
