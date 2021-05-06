import React from 'react'
import { defaultTo } from 'lodash'

import { TableLayout } from 'components/index'
import { getModelMetaData } from '../../helpers/prisma'

const WeighingsArea = ({ model = {} }) => {
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
  const weighingAreaMetadata = getModelMetaData('WeighingArea')

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
