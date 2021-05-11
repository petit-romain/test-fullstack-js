// Libraries
import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { Layout } from 'antd'
import { defaultTo } from 'lodash'

// Components
import Dropdown from './dropdown'

const { Header } = Layout

const CustomHeader = () => {
  const [session] = useSession()
  const router = useRouter()

  return (
    <Header>
      <div className='logo'>
        <img
          src='/assets/images/logo.svg'
          alt="Logo de l'application"
          onClick={() =>
            router.push(
              defaultTo(process.env.NEXT_PUBLIC_APP_HOME_PAGE, '/dashboard')
            )
          }
        />
      </div>
      <Dropdown session={session} />
    </Header>
  )
}

export default CustomHeader
