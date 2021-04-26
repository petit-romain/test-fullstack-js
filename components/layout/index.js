import {useState} from 'react'
import {useRouter} from 'next/router'
import {Layout, Menu} from 'antd'

import {DashboardOutlined, TeamOutlined} from '@ant-design/icons'
import './Layout.less'

const {Header, Content, Sider} = Layout


const CustomLayout = ({children}) => {
    const [menuSelectedKey, setMenuSelectedKey] = useState('dashboard')

    const router = useRouter()

    const handleOnClick = screen => {
        setMenuSelectedKey(screen)
        router.push(`/${screen}`)
    }

    return (
        <Layout>
            <Sider
                collapsible
                width={230}
            >
                <Menu
                    mode="inline"
                    selectedKeys={[menuSelectedKey]}
                    onClick={({key}) => handleOnClick(key)}
                >
                    <Menu.Item
                        className="logo"
                        selectable={false}
                    >
                        <img
                            src="/assets/images/logo_white.png"
                            alt="Logo de l'application"
                            onClick={() => handleOnClick('dashboard')}
                        />
                    </Menu.Item>
                    <Menu.Item
                        key="dashboard"
                        icon={<DashboardOutlined/>}
                    >
                        Dashboard
                    </Menu.Item>
                    <Menu.Item
                        key="users"
                        icon={<TeamOutlined/>}
                    >
                        Utilisateurs
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="header">

                </Header>

                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default CustomLayout
