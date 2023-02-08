import usePortal from 'react-cool-portal'

import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { deleteDevotionalById } from 'lib/services/devotionals'
import { IDevotional, SetStateAction } from 'lib/types'

import { Button, LinkAsButton } from 'components/common/Button'
import { Modal } from 'components/layout/Modal'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

interface IDevotionalItemProps extends IDevotional {
  refreshDevotionals: () => Promise<void>
  setIsLoading: (value: SetStateAction<boolean>) => void
}

export const DevotionalItem = ({ id, title, file, refreshDevotionals, setIsLoading }: IDevotionalItemProps) => {
  const { Portal, show, hide } = usePortal({ defaultShow: false })
  const [fileUrl, setFileUrl] = useState('')

  const deleteDevotional = async () => {
    hide()
    setIsLoading(true)
    const { error } = await deleteDevotionalById(id)

    if (error) {
      hide()
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    await refreshDevotionals()
    toast('Devocional eliminado exitosamente', { type: 'success' })
  }

  useEffect(() => {
    setTimeout(() => {
      setFileUrl(file.url)
    }, 10000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Modal Portal={Portal} hide={hide}>
        <div className='w-full flex gap-x-2 justify-start items-end pt-2 text-sm'>
          <Button onClick={hide} classes='w-full'>
            Cancelar
          </Button>

          <Button onClick={deleteDevotional} classes='w-full'>
            Confirmar
          </Button>
        </div>
      </Modal>

      <li className='bg-slate-200 border-slate-200 border-2 rounded-md p-3 dark:bg-[#1a1a1a] dark:border-gray-500 dark:border-2'>
        <h6 className='font-semibold dark:text-white'>{title}</h6>

        <a href={fileUrl} download className='text-blue-500'>
          Descargar Archivo
        </a>

        <div className='w-full flex gap-x-2 justify-start items-end pt-2 text-sm'>
          <LinkAsButton to={`/devocionales/${id}`} classes='w-full text-center'>
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
