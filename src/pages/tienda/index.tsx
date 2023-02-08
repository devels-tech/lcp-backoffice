import { useRef } from 'react'
import Head from 'next/head'

import { PageWithLayout, ReactNode } from 'lib/types'

import { AuthLayout } from 'layouts/AuthLayout'
import { LinkAsButton } from 'components/common/Button'

import { ComingSoon } from 'components/common/ComingSoon'

export const ShopPage: PageWithLayout = () => {
  return <ComingSoon />
  // const { current: shopOptions } =useRef([
  //   {
  //     label: 'Categorias',
  //     labelTo: 'Ver Categorias',
  //     to: '/tienda/categorias',
  //   },
  //   {
  //     label: 'Productos',
  //     labelTo: 'Ver Productos',
  //     to: '/tienda/productos',
  //   },
  // ])

  // return (
  //   <div>
  //     <div className='w-full h-full flex flex-col justify-center items-center'>
  //       <section className='w-full text-left'>
  //         <h4 className='text-xl font-bold dark:text-white'>Tienda</h4>
  //       </section>

  //       <ul className='w-full flex flex-wrap justify-center items-start gap-x-6 gap-y-6 mt-2'>
  //         {
  //           shopOptions.map(option => (
  //             <li key={option.labelTo} className='bg-gray-200 max-w-sm w-full h-72 p-4 rounded-md flex flex-col justify-between'>
  //               <h5 className='text-2xl font-black'>{ option.label }</h5>

  //               <div className='w-full h-full bg-gray-400 rounded-md'></div>

  //               <LinkAsButton to={ option.to } classes='w-full mt-2'>
  //                 { option.labelTo }
  //               </LinkAsButton>
  //             </li>
  //           ))
  //         }
  //       </ul>
  //     </div>
  //   </div>
  // )
}

ShopPage.getLayout = (page: ReactNode) => (
  <AuthLayout>
    <Head>
      <title>Tienda - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)

export default ShopPage
