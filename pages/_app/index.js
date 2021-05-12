// Libraries
import React, { Fragment } from 'react'
import { Provider } from 'next-auth/client'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import Head from 'next/head'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { message } from 'antd'
import { capitalize, isEmpty, filter, defaultTo, includes } from 'lodash'

// I18n
import i18nConfig from 'configs/i18n.config'

// Components
import Layout from 'components/layout'

// Styles
import './_app.module.less'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  const { t } = useTranslation('Common')

  const pageTitle = filter(
    router.route.split('/'),
    (path) => !isEmpty(path)
  ).pop()

  const signInPage = defaultTo(
    process.env.NEXT_PUBLIC_APP_SIGNIN_PAGE,
    '/auth/signin'
  )

  const Container = includes([signInPage, '/'], router.route)
    ? Fragment
    : Layout

  return (
    <Provider session={pageProps.session}>
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
                message.warn(t('api.error.403'))
                break
              case 404:
              case 500:
                router.push(`/${status.toString()}`)
                break
              default:
                break
            }
          }
        }}
      >
        <Container>
          <Head>
            <title>{`${process.env.NEXT_PUBLIC_APP_NAME} | ${capitalize(
              pageTitle
            )}`}</title>
          </Head>
          <style>
            {`#__next {
              height: 100%;
            }`}
          </style>
          <Component {...pageProps} />
        </Container>
      </SWRConfig>
    </Provider>
  )
}

export const getServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(
    locale,
    ['Common'],
    i18nConfig
  )

  return {
    props: translations
  }
}

export default appWithTranslation(App, i18nConfig)
