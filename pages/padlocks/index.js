import React from 'react'
import { defaultTo } from 'lodash'

import { TableLayout } from 'components/index'
import { getModelMetaData } from '../../helpers/prisma'

const Padlocks = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) =>
        defaultTo(a?.name, '').localeCompare(defaultTo(b?.name, ''))
    },
    {
      title: 'Référence',
      dataIndex: 'reference',
      key: 'reference',
      sorter: (a, b) =>
        defaultTo(a?.reference, '').localeCompare(defaultTo(b?.reference, ''))
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const padlockMetadata = getModelMetaData('Padlock')

  return {
    props: {
      model: {
        ...padlockMetadata,
        blackListFields: []
      }
    }
  }
}

export default Padlocks
