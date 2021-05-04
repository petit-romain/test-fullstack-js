import React, { useEffect } from 'react'
import { Provider, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { capitalize, replace, includes } from 'lodash'

import { Layout } from 'components'

import './_app.module.less'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const [session] = useSession()

  // useEffect(() => {
  //   console.log(pageProps, session)
  // }, [])

  const pageTitle = capitalize(replace(router.route, '/', ''))

  // console.log(pageTitle, router, pageTitle)

  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <title>{`${pageTitle}`}</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App
