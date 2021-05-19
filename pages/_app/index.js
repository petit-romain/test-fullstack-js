// Libraries
import React, { Fragment, useCallback, useState } from 'react'
import { Provider } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import moment from 'moment'
import { ConfigProvider } from 'antd'
import i18next from 'i18next'
import { defaultTo, includes } from 'lodash'

// I18n
import 'lib/i18n'
import './Common.i18n'

// Antd locales
import frFr from 'antd/lib/locale/fr_FR'
import enGb from 'antd/lib/locale/en_GB'

// Styles
import './_app.module.less'

// Components
import Layout from 'components/layout'

// Locales
const locales = {
  fr: frFr,
  en: enGb
}

const CustomApp = ({ Component, pageProps }) => {
  const [session, setSession] = useState({})
  const [locale, setLocale] = useState(
    defaultTo(locales[i18next.language], enGb)
  )

  const router = useRouter()

  const signInPage = defaultTo(
    process.env.NEXT_PUBLIC_APP_SIGNIN_PAGE,
    '/auth/signin'
  )

  const onLanguageChange = useCallback(async (lng) => {
    i18next.changeLanguage(lng)
    moment.locale(lng)
    setLocale(defaultTo(locales[lng], enGb))
  }, [])

  const onSessionChange = useCallback(async (newSession) => {
    setSession(newSession)
  }, [])

  const Container = includes([signInPage, '/'], router.route)
    ? { Component: Fragment, props: {} }
    : { Component: Layout, props: { session, onLanguageChange } }

  return (
    <ConfigProvider locale={locale}>
      <Provider session={session}>
        <Container.Component {...Container.props}>
          <Head>
            <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
          </Head>
          <style>
            {`#__next {
              height: 100%;
            }`}
          </style>
          <Component
            {...pageProps}
            session={session}
            onSessionChange={onSessionChange}
          />
        </Container.Component>
      </Provider>
    </ConfigProvider>
  )
}

export default CustomApp
