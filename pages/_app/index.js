// Libraries
import React, { Fragment } from 'react'
import App from 'next/app'
import { getSession, Provider } from 'next-auth/client'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import Head from 'next/head'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { message } from 'antd'
import { defaultTo, includes } from 'lodash'

// I18n
import i18nConfig from 'configs/i18n.config'

// Styles
import './_app.module.less'

// Components
import Layout from 'components/layout'

const CustomApp = ({ Component, pageProps, session }) => {
  const router = useRouter()

  const { t } = useTranslation('Common')

  const signInPage = defaultTo(
    process.env.NEXT_PUBLIC_APP_SIGNIN_PAGE,
    '/auth/signin'
  )

  const Container = includes([signInPage, '/'], router.route)
    ? Fragment
    : Layout

  return (
    <Provider session={session}>
      <SWRConfig
        value={{
          shouldRetryOnError: false,
          onError: (err) => {
            const status = err?.response?.status
            switch (status) {
              case 401:
                router.push(signInPage)
                message.warn(t('api.error.401'))
                break
              case 403:
                message.info(t(`api.error.403`))
                break
              case 404:
                message.warn(t(`api.error.404`))
                break
              case 500:
                throw new Error(err?.response?.data)
              default:
                break
            }
          }
        }}
      >
        <Container session={session}>
          <Head>
            <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
          </Head>
          <style>
            {`#__next {
              height: 100%;
            }`}
          </style>
          <Component {...pageProps} session={session} />
        </Container>
      </SWRConfig>
    </Provider>
  )
}

CustomApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const session = await getSession(appContext)

  return { ...appProps, session }
}

export default appWithTranslation(CustomApp, i18nConfig)
