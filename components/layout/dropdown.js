import { Avatar, Dropdown, Menu, message } from 'antd'
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import React, { useCallback } from 'react'
import { signOut } from 'next-auth/client'
import { defaultTo } from 'lodash'
import { useRouter } from 'next/router'

const CustomDropdown = ({ session }) => {
  const router = useRouter()

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
        Page de profile
      </Menu.Item>

      <Menu.Item
        icon={<LogoutOutlined />}
        key='logout'
        onClick={handleOnSignOut}
      >
        Déconnexion
      </Menu.Item>

      <Menu.Item key='versions' disabled>
        <span>{`Version ${process.env.NEXT_PUBLIC_APP_VERSION}`}</span>
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

export default CustomDropdown
