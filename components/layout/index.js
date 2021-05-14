// Libraries
import React from 'react'
import { Layout } from 'antd'

// Styles
import './Layout.less'

// Components
import Sider from './sider'
import Header from './header'

const { Content } = Layout

const CustomLayout = ({ children, session }) => {
  return (
    <Layout>
      <Header session={session} />
      <Layout>
        <Sider session={session} />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default CustomLayout
