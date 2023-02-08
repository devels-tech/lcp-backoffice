import Head from 'next/head'

import { PageWithLayout, ReactNode } from 'lib/types'

import { AuthLayout } from 'layouts/AuthLayout'
import { FormCreateBanner } from 'components/pages/banners/FormCreateBanner'

export const CreateBannersPage: PageWithLayout = () => {
  return (
    <div>
      <h4 className='text-xl font-bold dark:text-white'>Crear Banner</h4>

      <p className='text-sm mt-4 font-bold dark:text-white'>Recuerda lo siguiente:</p>

      <ul className='list-disc mt-1 pl-3.5 text-sm'>
        <li className='dark:text-gray-100'>Las imagenes no deben pesar mas de <span className='font-bold'>2MB</span></li>
        <li className='dark:text-gray-100'>La imagen para mobile debe tener estas dimensiones <span className='font-bold'>(540 x 1080)</span></li>
        <li className='dark:text-gray-100'>La imagen para desktop debe tener estas dimensiones <span className='font-bold'>(1920 x 1080)</span></li>
      </ul>

      <small className='dark:text-gray-100'>
        Te recomendamos usar&nbsp;
        <a
          className='text-blue-800 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 underline'
          href='https://tinypng.com/'
          rel='noopener noreferrer'
          target='_blank'
        >
          tinypng.com
        </a>
        &nbsp;para minificar el peso de las imagenes sin perder mucha calidad.
      </small>

      <section className='mt-4'>
        <FormCreateBanner />
      </section>
    </div>
  )
}

CreateBannersPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Crear Banner - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)

export default CreateBannersPage
