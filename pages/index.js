// Libraries
import React, { useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import { defaultTo, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'

// Styles
import './_app/_app.module.less'

const Home = ({ session }) => {
  const router = useRouter()
  const { t } = useTranslation('Common')

  useEffect(() => {
    const signInUrl = defaultTo(
      process.env.NEXT_PUBLIC_APP_SIGNIN_PAGE,
      '/auth/signin'
    )
    const landingUrl = defaultTo(
      process.env.NEXT_PUBLIC_APP_HOME_PAGE,
      '/dashboard'
    )

    router.push(isNil(session) ? signInUrl : landingUrl)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Spin tip={t('app.loading')} />
    </div>
  )
}

export default Home
