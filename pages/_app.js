import {Provider} from 'next-auth/client'

import {Layout} from 'antd'

const {Content, Footer, Header, Sider} = Layout

function MyApp({Component, pageProps}) {
    const isUserLogged = false

    return (
        <Provider session={pageProps.session}>
            {isUserLogged ?
                <Layout>
                    <Header>Header</Header>
                    <Layout>
                        <Sider>Sider</Sider>
                        <Content>
                            <Component {...pageProps} />
                        </Content>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>
                :
                <Component {...pageProps} />}
        </Provider>
    )
}

export default MyApp
