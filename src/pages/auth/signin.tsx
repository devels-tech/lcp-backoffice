import Head from 'next/head'

import { PageWithLayout, ReactNode } from 'lib/types'

import { MainLayout } from 'layouts/Main'
import { FormSignIn } from 'components/pages/login/FormSignIn'

export const SignInPage: PageWithLayout = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <section className='max-w-lg mx-auto w-full'>
        <h4 className='text-xl font-bold text-center dark:text-white'>Iniciar Sesion</h4>
        <FormSignIn />
      </section>
    </div>
  )
}

SignInPage.getLayout = (page: ReactNode) => (
  <MainLayout>
    <Head>
      <title>Iniciar Sesión - LCP Admin</title>
    </Head>

    {page}
  </MainLayout>
)

export default SignInPage
