// Libraries
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Layout, Menu } from 'antd'
import { defaultTo, isEmpty, isNil, map } from 'lodash'

// Components
import routes from './routes'

const { Sider } = Layout

const CustomSider = () => {
  const router = useRouter()
  const { t } = useTranslation('Common')

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
              title={t(`layout.sider.${route?.key}`)}
            >
              {map(defaultTo(route?.screens, []), (screen) => {
                const SubMenuIcon = screen?.icon
                return (
                  <Menu.Item key={screen?.key} icon={<SubMenuIcon />}>
                    {t(`layout.sider.${screen?.key}`)}
                  </Menu.Item>
                )
              })}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={route?.key} icon={<MenuIcon />}>
              {t(`layout.sider.${route?.key}`)}
            </Menu.Item>
          )
        })}
      </Menu>
    </Sider>
  )
}

export default CustomSider
