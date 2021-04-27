import {useCallback, useState} from 'react'
import {useRouter} from 'next/router'
import {Menu, Layout} from 'antd'
import {DashboardOutlined, TeamOutlined} from '@ant-design/icons'

const {Sider} = Layout

const CustomSider = () => {
    const router = useRouter()
    const [menuSelectedKey, setMenuSelectedKey] = useState(router.route.split('/')[1])

    const handleOnClick = useCallback(screen => {
        setMenuSelectedKey(screen)
        router.push(`/${screen}`)
    }, [])

    return (
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
    )
}

export default CustomSider
