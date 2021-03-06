import {Layout} from 'antd'

const { Content } = Layout

import Header from './header'
import Sider from './sider'
import Footer from './footer'

import './Layout.module.less'

const CustomLayout = ({children}) => {
    return <Layout>
        <Header>Header</Header>
        <Layout>
            <Sider>Sider</Sider>
            <Content>
                {children}
            </Content>
        </Layout>
        <Footer>Footer</Footer>
    </Layout>
}

export default CustomLayout