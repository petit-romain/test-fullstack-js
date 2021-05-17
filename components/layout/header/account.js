// Libraries
import { Avatar, Dropdown, Menu, message } from 'antd'
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import React, { useCallback } from 'react'
import { getSession, signOut } from 'next-auth/client'
import { defaultTo } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

// I18n
import '../Layout.i18n'

const CustomDropdown = ({ session }) => {
  const router = useRouter()
  const { t } = useTranslation('Layout')

  const handleOnSignOut = useCallback(() => {
    signOut({
      callbackUrl:
        window.location.origin +
        defaultTo(process.env.NEXT_PUBLIC_APP_SIGNIN_PAGE, '/auth/signin')
    }).catch(() => {
      message.error('api.error.signout')
    })
  }, [])
  const overlay = (
    <Menu>
      <Menu.Item
        icon={<UserOutlined />}
        key='profile'
        onClick={() => router.push('/profile')}
      >
        {t('breadcrumb.profile')}
      </Menu.Item>

      <Menu.Item
        icon={<LogoutOutlined />}
        key='logout'
        onClick={handleOnSignOut}
      >
        {t('breadcrumb.logout')}
      </Menu.Item>

      <Menu.Item key='versions' disabled>
        <span>
          {t('breadcrumb.version', {
            version: process.env.NEXT_PUBLIC_APP_VERSION
          })}
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown trigger={['click']} overlay={overlay}>
      <span>
        <Avatar
          size='small'
          src={session?.user?.image}
          icon={<UserOutlined />}
        />
        <span>
          {[session?.user?.firstName, session?.user?.lastName].join(' ')}
        </span>
        <DownOutlined />
      </span>
    </Dropdown>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props: {}
  }
}

export default CustomDropdown
