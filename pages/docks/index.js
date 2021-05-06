import React from 'react'

import { TableLayout } from 'components/index'
import { getModelMetadata } from 'helpers/prisma'

const Docks = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Boîtier',
      dataIndex: 'box',
      key: 'box'
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const dockMetadata = getModelMetadata('Dock')

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
