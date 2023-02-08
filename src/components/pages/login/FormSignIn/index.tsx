import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { Button } from 'components/common/Button'
import { ErrorForm } from 'components/common/errors/ErrorForm'
import { SpinnerLoader, LockClosed } from 'components/common/icons'

import { rulesForm } from './formConfig'
import { signIn } from 'lib/services/auth'
import { handleFetchErrors } from 'lib/utils/handleFetchErrors'
import { useAuthStore } from 'lib/store/Auth'
import { setLocalStorage } from 'lib/utils/localStorage'
import { InputBasic } from 'components/common/inputs'
import { PasswordInput } from 'components/common/inputs/InputBasic'

interface IUserSignIn {
  email: string
  password: string
}

export const FormSignIn = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserSignIn>()
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const onSubmit: SubmitHandler<IUserSignIn> = async (dataForm: IUserSignIn) => {
    setLoading(true)

    const { data, error } = await signIn(dataForm.email, dataForm.password)

    if (error) {
      setLoading(false)
      handleFetchErrors(error.status, error.message)
      return
    }

    setLocalStorage('accessToken', data.accessToken)
    reset()
    setAuth(data)
    setLoading(false)
    toast('Sesión iniciada', { type: 'success' })
    router.push('/dashboard')
  }

  return (
    <>
      { errors?.email && <ErrorForm>{ errors.email.message }</ErrorForm> }
      { errors?.password && <ErrorForm>{ errors.password.message }</ErrorForm> }

      <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-6'>
        <div className='rounded-md shadow-sm -space-y-px'>
          <InputBasic
            id='email'
            type='email'
            register={register}
            rules={rulesForm}
            label='Correo Electrónico'
            placeholder='Correo Electrónico'
            autoComplete='email'
            errors={errors}
          />

          <PasswordInput
            id='password'
            register={register}
            rules={rulesForm}
            label='Contraseña'
            placeholder='Contraseña'
            autoComplete='password'
            errors={errors}
          />
        </div>

        <div className='text-center'>
          <Button
            type='submit'
            disabled={loading}
            classes='group relative w-full flex justify-center py-2 hover:bg-opacity-95 disabled:opacity-50 disabled:cursor-wait px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-primary-300 dark:group-hover:text-white'
          >
            <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
              <LockClosed />
            </span>

            { loading ? <SpinnerLoader classes='animate-spin h-5 w-5 text-white' /> : 'Iniciar Sesión' }
          </Button>
        </div>
      </form>
    </>
  )
}
