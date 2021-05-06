import React from 'react'
import { defaultTo } from 'lodash'

import { TableLayout } from 'components/index'
import { getModelMetaData } from '../../helpers/prisma'

const RotationTimes = ({ model = {} }) => {
  const columns = [
    {
      title: 'Lieu de départ',
      dataIndex: 'beginningPlace',
      key: 'beginningPlace',
      sorter: (a, b) =>
        defaultTo(a?.beginningPlace, '').localeCompare(
          defaultTo(b?.beginningPlace, '')
        )
    },
    {
      title: "Lieu d'arrivée",
      dataIndex: 'endingPlace',
      key: 'endingPlace',
      sorter: (a, b) =>
        defaultTo(a?.endingPlace, '').localeCompare(
          defaultTo(b?.endingPlace, '')
        )
    },
    {
      title: 'Durée',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => defaultTo(a?.duration, 0) - defaultTo(b?.duration, 0)
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const rotationTimeMetadata = getModelMetaData('RotationTime')

  return {
    props: {
      model: {
        ...rotationTimeMetadata,
        blackListFields: []
      }
    }
  }
}

export default RotationTimes
