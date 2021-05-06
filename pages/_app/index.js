import React, { Fragment } from 'react'
import { Provider } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { capitalize, isEmpty, filter, defaultTo, includes } from 'lodash'

import Layout from 'components/layout'

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

export default App
