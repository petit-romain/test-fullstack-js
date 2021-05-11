// Libraries
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout, Menu } from 'antd'
import { defaultTo, isEmpty, isNil, map } from 'lodash'

// Components
import routes from './routes'

const { Sider } = Layout

const CustomSider = () => {
  const router = useRouter()

  const [menuSelectedKey, setMenuSelectedKey] = useState(
    router.route.split('/')[1]
  )

  const handleOnClick = useCallback((screen) => {
    setMenuSelectedKey(screen)
    router.push(`/${screen}`)
  }, [])

  return (
    <Sider collapsible width={230}>
      <Menu
        mode='inline'
        selectedKeys={[menuSelectedKey]}
        onClick={({ key }) => handleOnClick(key)}
      >
        {map(routes, (route) => {
          const MenuIcon = route?.icon
          const isSubMenu = !isNil(route?.screens) && !isEmpty(route?.screens)

          return isSubMenu ? (
            <Menu.SubMenu
              key={route?.key}
              icon={<MenuIcon />}
              title={route?.title}
            >
              {map(defaultTo(route?.screens, []), (screen) => {
                const SubMenuIcon = screen?.icon
                return (
                  <Menu.Item key={screen?.key} icon={<SubMenuIcon />}>
                    {screen?.title}
                  </Menu.Item>
                )
              })}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={route?.key} icon={<MenuIcon />}>
              {route?.title}
            </Menu.Item>
          )
        })}
      </Menu>
    </Sider>
  )
}

export default CustomSider
