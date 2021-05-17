// Libraries
import React from 'react'
import { useRouter } from 'next/router'
import { Layout } from 'antd'
import { defaultTo } from 'lodash'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

// I18n
import './Layout.i18n'
import 'pages/_app/Common.i18n'

// Components
import Dropdown from './dropdown'
import Languages from './languages'

const { Header } = Layout

const CustomHeader = ({ session }) => {
  const router = useRouter()

  const { t } = useTranslation('Layout')

  return (
    <Header>
      <div className='logo'>
        <img
          src='/assets/images/logo.svg'
          alt={t('Common:app.logo')}
          onClick={() =>
            router.push(
              defaultTo(process.env.NEXT_PUBLIC_APP_HOME_PAGE, '/dashboard')
            )
          }
        />
      </div>
      <div className='dropdowns'>
        <Dropdown session={session} />
        <Languages />
      </div>
    </Header>
  )
}

export default CustomHeader
