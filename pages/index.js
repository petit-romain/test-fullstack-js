// Libraries
import React, { useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import { defaultTo, isNil } from 'lodash'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

// Configs
import i18nConfig from 'configs/i18n.config'

// Styles
import styles from './Home.module.css'

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
    <div className={styles.page}>
      <Spin tip={t('app.loading')} />
    </div>
  )
}

export const getServerSideProps = async ({ req, locale }) => {
  const translations = await serverSideTranslations(
    locale,
    ['Common'],
    i18nConfig
  )

  return {
    props: {
      session: await getSession({ req }),
      ...translations
    }
  }
}

export default Home
