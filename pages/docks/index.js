import React from 'react'
import { defaultTo } from 'lodash'

import { TableLayout } from 'components/index'
import { getModelMetaData } from '../../helpers/prisma'

const Docks = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) =>
        defaultTo(a?.name, '').localeCompare(defaultTo(b?.name, ''))
    },
    {
      title: 'Boîtier',
      dataIndex: 'box',
      key: 'box',
      sorter: (a, b) =>
        defaultTo(a?.box, '').localeCompare(defaultTo(b?.box, ''))
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const dockMetadata = getModelMetaData('Dock')

  return {
    props: {
      model: {
        ...dockMetadata,
        blackListFields: []
      }
    }
  }
}

export default Docks
