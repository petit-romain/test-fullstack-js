import React from 'react'
import { defaultTo, find, map, reject } from 'lodash'
import { Tag } from 'antd'

import { TableLayout } from 'components/index'

import { getModelMetaData } from 'helpers/prisma'

const Users = ({ model = {} }) => {
  const roles = find(model?.fields, ['name', 'roles']).choices

  const columns = [
    {
      title: 'Nom / Prénom',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) =>
        defaultTo(a?.name, '').localeCompare(defaultTo(b?.name, ''))
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) =>
        defaultTo(a?.email, '').localeCompare(defaultTo(b?.email, ''))
    },
    {
      title: 'Rôles',
      dataIndex: 'roles',
      key: 'roles',
      filters: map(
        reject(defaultTo(roles, []), (role) => role === 'UBIADMIN'),
        (role) => ({
          text: role,
          value: role
        })
      ),
      render: (roles) => (
        <div className='column-roles'>
          {map(roles, (role, index) => (
            <Tag key={index}>{role}</Tag>
          ))}
        </div>
      )
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const userMetadata = getModelMetaData('User')

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
