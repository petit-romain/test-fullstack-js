import React from 'react'

import { TableLayout } from 'components/index'
import { getModelMetadata } from 'helpers/prisma'

const Boxes = ({ model = {} }) => {
  const columns = [
    {
      title: 'Numéro de série',
      dataIndex: 'serialNumber',
      key: 'serialNumber'
    },
    {
      title: 'Identifiant Lora',
      dataIndex: 'deviceAddress',
      key: 'deviceAddress'
    },
    {
      title: 'Lieu associé',
      dataIndex: 'box',
      key: 'box'
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const boxMetadata = getModelMetadata('Boxe')

  return {
    props: {
      model: {
        ...boxMetadata,
        blackListFields: []
      }
    }
  }
}

export default Boxes
