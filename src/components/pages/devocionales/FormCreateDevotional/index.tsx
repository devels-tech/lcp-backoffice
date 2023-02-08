
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { createDevotional } from 'lib/services/devotionals'
import { getAllAuthors } from 'lib/services/authors'
import { IDevotionalToCreate } from 'lib/types'
import { useAuthStore } from 'lib/store/Auth'
import { config } from 'config'

import { LoaderPage } from 'components/layout/loaders/LoaderPage'
import { InputBasic } from 'components/common/inputs/InputBasic'
import { ErrorForm } from 'components/common/errors/ErrorForm'
import { Button } from 'components/common/Button'
import { rulesForm } from './rulesForm'

export const FormCreateDevotional = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IDevotionalToCreate>()
  const [authors, setAuthors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { auth } = useAuthStore()
  const router = useRouter()

  const onSubmit = async (dataForm: IDevotionalToCreate) => {
    setIsLoading(true)
    const file = dataForm.file[0] as File
    console.log('file', file)

    if (file.type !== 'application/pdf') {
      toast('Solo archivos PDF', { type: 'error' })
      setIsLoading(false)
      return
    }

    if (file.size > config.FILE_LIMITS.DEVOTIONALS.FILE_SIZE) {
      toast('Solo archivos menos de 5MB', { type: 'error' })
      setIsLoading(false)
      return
    }

    const authorFinded = authors.find(author => author.user.id === auth.id)

    if (!authorFinded) {
      toast('No tienes permisos de autor', { type: 'error' })
      setIsLoading(false)
      return
    }

    const devotonalToCreate: IDevotionalToCreate = { title: dataForm.title, file, authorId: authorFinded.id }
    const { error } = await createDevotional(devotonalToCreate)

    if (error) {
      setIsLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setIsLoading(false)
    router.push('/devocionales')
  }

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllAuthors()

      if (error) return toast('Hubo un error', { type: 'error' })

      setAuthors(data)
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) return <LoaderPage />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-3xl mx-auto mt-2'>
      { errors?.title && <ErrorForm>{ errors.title.message }</ErrorForm> }

      <InputBasic
        id='title'
        type='text'
        register={register}
        rules={rulesForm}
        label='Título del Devocional'
        placeholder='Título del Devocional'
      />

      { errors?.file && <ErrorForm>{ errors.file.message }</ErrorForm> }

      <label className='block'>
        <span className='sr-only'>Seleccionar Archivo</span>
        <input
          {...register('file', { required: { value: true, message: '* Requerido' } })}
          type='file'
          id='file'
          name='file'
          accept='application/pdf'
          className='block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100'
        />
      </label>

      <Button type='submit' classes='mt-4 w-full'>
        Crear Devocional
      </Button>
    </form>
  )
}
