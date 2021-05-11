// Libraries
import React, { Fragment } from 'react'
import { Provider } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { capitalize, isEmpty, filter, defaultTo, includes } from 'lodash'

// I18n
import i18nConfig from 'configs/i18n.config'

// Components
import Layout from 'components/layout'

// Styles
import './_app.module.less'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  const pageTitle = filter(
    router.route.split('/'),
    (path) => !isEmpty(path)
  ).pop()

  const Container = includes(
    [defaultTo(process.env.NEXT_PUBLIC_APP_SIGNIN_PAGE, '/auth/signin'), '/'],
    router.route
  )
    ? Fragment
    : Layout

  return (
    <Provider session={pageProps.session}>
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
    </Provider>
  )
}

export default appWithTranslation(App, i18nConfig)
