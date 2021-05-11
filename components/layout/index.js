// Libraries
import React from 'react'
import { Layout } from 'antd'

// Styles
import './Layout.less'

// Components
import Sider from './sider'
import Header from './header'

const { Content } = Layout

const CustomLayout = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default CustomLayout
