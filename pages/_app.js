import Layout from '../components/layout'

import '../styles/App.module.less'

function App({Component, pageProps}) {

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default App
