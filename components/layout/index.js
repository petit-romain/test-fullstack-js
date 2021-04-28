import React from 'react'
import { Layout } from 'antd'

import Sider from './sider'
import Header from './header'

import './Layout.less'

const { Content } = Layout

const CustomLayout = ({ children }) => {
  return (
    <Layout>
      <Sider />
      <Layout>
        <Header />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default CustomLayout
