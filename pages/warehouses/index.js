import React from 'react'
import { defaultTo } from 'lodash'

import { TableLayout } from 'components/index'
import { getModelMetaData } from '../../helpers/prisma'

const Warehouses = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) =>
        defaultTo(a?.name, '').localeCompare(defaultTo(b?.name, ''))
    },
    {
      title: 'Portes',
      dataIndex: 'gates',
      key: 'gates',
      sorter: (a, b) => defaultTo(a?.gates, 0) - defaultTo(b?.gates, 0)
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const warehouseMetadata = getModelMetaData('Warehouse')

  return {
    props: {
      model: {
        ...warehouseMetadata,
        blackListFields: []
      }
    }
  }
}

export default Warehouses
