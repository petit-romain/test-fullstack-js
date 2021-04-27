import {useEffect, useRef} from 'react'
import {getSession, Provider} from 'next-auth/client'
import {useRouter} from 'next/router'
import {includes, isNil} from 'lodash'

import Layout from '../components/layout'

import '../styles/App.module.less'

const App = ({Component, pageProps}) => {
    const router = useRouter()

    let session = useRef(null)

    useEffect(async () => {
        session.current = await getSession()

        const isUserLogged = !isNil(session?.current)

        if (isUserLogged) {
            if (includes(['/', '/auth/signin'], router.route)) router.push('/dashboard')
        } else {
            await router.push('/auth/signin')
        }
    }, [router.route])

    console.log({pageProps, session: session?.current})

    return (
        <Provider session={session?.current}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

export default App
