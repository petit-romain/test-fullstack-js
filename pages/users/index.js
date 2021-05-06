import React, { Fragment } from 'react'
import { map } from 'lodash'
import { Tag } from 'antd'

import { TableLayout } from 'components/index'

import { getModelMetadata } from 'helpers/prisma'

const Users = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Prénom',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Rôles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => (
        <Fragment>
          {map(roles, (role, index) => (
            <Tag key={index}>{role}</Tag>
          ))}
        </Fragment>
      )
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const userMetadata = getModelMetadata('User')

  return {
    props: {
      model: {
        ...userMetadata,
        blackListFields: [
          'email',
          'emailVerified',
          'image',
          'createdAt',
          'updatedAt'
        ]
      }
    }
  }
}

export default Users
