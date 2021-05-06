import React from 'react'

import { TableLayout } from 'components/index'
import { getModelMetadata } from 'helpers/prisma'

const Padlocks = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Référence',
      dataIndex: 'reference',
      key: 'reference'
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const padlockMetadata = getModelMetadata('Padlock')

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
