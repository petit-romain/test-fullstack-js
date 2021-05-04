import React, { useEffect } from 'react'
import { Provider, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { capitalize, isEmpty, filter } from 'lodash'

import { Layout } from 'components'

import './_app.module.less'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const [session] = useSession()

  // useEffect(() => {
  //   console.log(pageProps, session)
  // }, [])

  const pageTitle = filter(
    router.route.split('/'),
    (path) => !isEmpty(path)
  ).pop()

  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <title>{`${process.env.NEXT_PUBLIC_APP_NAME} | ${capitalize(
            pageTitle
          )}`}</title>
        </Head>
        <Component {...pageProps} />
        <style>
          {`#__next {
              height: 100%;
            }`}
        </style>
      </Layout>
    </Provider>
  )
}

export default App
