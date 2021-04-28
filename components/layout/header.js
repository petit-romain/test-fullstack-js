import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import { Avatar, Dropdown, Layout, Menu, message } from 'antd'
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'

const { Header } = Layout

const CustomHeader = () => {
  const [session] = useSession()
  const router = useRouter()

  const handleOnSignOut = useCallback(() => {
    signOut({
      callbackUrl: window.location.origin + '/auth/signin'
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
    <Header>
      <Dropdown trigger={['click']} overlay={overlay}>
        <span>
          <Avatar
            size='small'
            src={session?.user?.image}
            icon={<UserOutlined />}
          />
          <span> {session?.user?.name} </span>
          <DownOutlined />
        </span>
      </Dropdown>
    </Header>
  )
}

export default CustomHeader
