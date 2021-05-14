// Libraries
import React from 'react'
import { useRouter } from 'next/router'
import { Layout } from 'antd'
import { defaultTo } from 'lodash'

// Components
import Dropdown from './dropdown'
import { useTranslation } from 'next-i18next'

const { Header } = Layout

const CustomHeader = ({ session }) => {
  const router = useRouter()

  const { t } = useTranslation('Common')

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
