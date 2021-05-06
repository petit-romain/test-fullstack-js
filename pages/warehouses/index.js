import React from 'react'

import { TableLayout } from 'components/index'
import { getModelMetadata } from 'helpers/prisma'

const Warehouses = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Portes',
      dataIndex: 'gates',
      key: 'gates'
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const warehouseMetadata = getModelMetadata('Warehouse')

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
