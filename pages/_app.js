import {Fragment, useEffect, useRef, useState} from 'react'
import {getSession, Provider, useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import Head from 'next/head'
import {isNil, replace, capitalize} from 'lodash'

import Layout from '../components/layout'

import '../styles/App.module.less'

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
