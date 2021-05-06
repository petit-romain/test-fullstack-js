import React from 'react'

import { TableLayout } from 'components/index'
import { getModelMetadata } from 'helpers/prisma'

const WeighingsArea = ({ model = {} }) => {
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
  const weighingAreaMetadata = getModelMetadata('WeighingArea')

  return {
    props: {
      model: {
        ...weighingAreaMetadata,
        blackListFields: []
      }
    }
  }
}

export default WeighingsArea
