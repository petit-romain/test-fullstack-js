// Libraries
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Layout, Menu } from 'antd'
import { defaultTo, filter, includes, isEmpty, isNil, map, some } from 'lodash'

// I18n
import '../Layout.i18n'

// Components
import routes from './routes'

const { Sider: Index } = Layout

const CustomSider = ({ session }) => {
  const router = useRouter()
  const { t } = useTranslation('Layout')

  const [menuSelectedKey, setMenuSelectedKey] = useState(
    router.route.substring(1)
  )

  const handleOnClick = useCallback((screen) => {
    setMenuSelectedKey(screen)
    router.push(`/${screen}`)
  }, [])

  const filteredRoutes = filter(routes, ({ roles = [], ...route }) => {
    return some(roles, (role) =>
      includes(defaultTo(session?.user?.roles, []), role)
    )
  })

  return (
    <Index collapsible width={230}>
      <Menu
        mode='inline'
        selectedKeys={[menuSelectedKey]}
        onClick={({ key }) => handleOnClick(key)}
      >
        {map(filteredRoutes, (route) => {
          const MenuIcon = route?.icon
          const isSubMenu = !isNil(route?.screens) && !isEmpty(route?.screens)

          return isSubMenu ? (
            <Menu.SubMenu
              key={route?.key}
              icon={<MenuIcon />}
              title={t(`sider.${route?.key}.title`)}
            >
              {map(defaultTo(route?.screens, []), (screen) => {
                const SubMenuIcon = screen?.icon
                return (
                  <Menu.Item
                    key={[route?.key, screen?.key].join('/')}
                    icon={<SubMenuIcon />}
                  >
                    {t(`sider.${route?.key}.${screen?.key}`)}
                  </Menu.Item>
                )
              })}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={route?.key} icon={<MenuIcon />}>
              {t(`sider.${route?.key}`)}
            </Menu.Item>
          )
        })}
      </Menu>
    </Index>
  )
}

export default CustomSider
