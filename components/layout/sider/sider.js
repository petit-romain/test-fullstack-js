import {useState} from 'react'
import Router from "next/router"

import {Layout, Menu} from 'antd'
import {DashboardOutlined, TeamOutlined} from '@ant-design/icons'

const {Sider} = Layout

import './Sider.module.less'

const CustomSider = () => {
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }

    const menu = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: <DashboardOutlined />
        }
    ]

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu mode="inline" defaultSelectedKeys={['dashboard']}>
                {menu.map(({id, label, icon}) => (
                    <Menu.Item key={id} icon={icon} onClick={() => Router.push(`/${id}`)}>
                        {label}
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    )
}


export default CustomSider