import {Fragment} from 'react'
import {Provider} from 'next-auth/client'

import Layout from '../components/layout'

import '../styles/App.module.less'

function MyApp({Component, pageProps}) {
    const isUserLogged = true

    const Container = isUserLogged ? Layout : Fragment

    return (
        <Provider session={pageProps.session}>
            <Container>
                <Component {...pageProps} />
            </Container>
        </Provider>
    )
}

export default MyApp
