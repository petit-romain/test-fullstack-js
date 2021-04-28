import {Fragment, useEffect, useState} from 'react'
import {getSession, Provider} from 'next-auth/client'
import {useRouter} from 'next/router'
import Head from 'next/head'
import {capitalize, isNil, replace} from 'lodash'

import {Layout} from 'components'

import './_app.less'

const App = ({Component, pageProps}) => {
    const router = useRouter()
    const [isUserLogged, setIsUserLogged] = useState(false)

    const Container = isUserLogged && router.route !== '/' ? Layout : Fragment

    useEffect(async () => {
        const session = await getSession()
        setIsUserLogged(!isNil(session))
    }, [])

    return (
        <Provider>
            <Container>
                <Head>
                    <title>
                        {`${process.env.NEXT_PUBLIC_APP_NAME} | ${capitalize(replace(router.route, '/', ''))}`}
                    </title>
                </Head>
                <Component {...pageProps} />
            </Container>
        </Provider>
    )
}

export default App
