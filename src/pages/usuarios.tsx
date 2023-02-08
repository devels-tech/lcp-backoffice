import { ReactElement, useEffect, useState } from 'react'
import Head from 'next/head'

import { AuthLayout } from 'layouts/AuthLayout'
import { ComingSoon } from 'components/common/ComingSoon'

export default function UsuariosPage () {
  return <ComingSoon />
  // const [users, setUsers] = useState([])

  // useEffect(() => {
  //   fetch('/api/users')
  //     .then(res => res.json())
  //     .then(users => setUsers([...users.data]))
  // }, [])

  // return (
  //   <div className='w-full h-full'>
  //     <span>LCP Admin - Usuarios</span>

  //     <br />

  //     <div>
  //       {users?.map(user => <li key={user.uid}>{user?.email}</li>)}
  //     </div>
  //   </div>
  // )
}

UsuariosPage.getLayout = (page: ReactElement) => (
  <AuthLayout>
    <Head>
      <title>Usuarios - LCP Admin</title>
    </Head>

    {page}
  </AuthLayout>
)
