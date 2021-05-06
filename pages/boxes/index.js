import React from 'react'
import { defaultTo } from 'lodash'

import { TableLayout } from 'components/index'
import { getModelMetaData } from '../../helpers/prisma'

const Boxes = ({ model = {} }) => {
  const columns = [
    {
      title: 'Numéro de série',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      sorter: (a, b) =>
        defaultTo(a?.serialNumber, '').localeCompare(
          defaultTo(b?.serialNumber, '')
        )
    },
    {
      title: 'Identifiant Lora',
      dataIndex: 'deviceAddress',
      key: 'deviceAddress',
      sorter: (a, b) =>
        defaultTo(a?.deviceAddress, '').localeCompare(
          defaultTo(b?.deviceAddress, '')
        )
    },
    {
      title: 'Lieu associé',
      dataIndex: 'box',
      key: 'box',
      sorter: (a, b) =>
        defaultTo(a?.box, '').localeCompare(defaultTo(b?.box, ''))
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const boxMetadata = getModelMetaData('Boxe')

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
