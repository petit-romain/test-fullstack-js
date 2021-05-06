import React from 'react'

import { TableLayout } from 'components/index'
import { getModelMetadata } from 'helpers/prisma'

const RotationTimes = ({ model = {} }) => {
  const columns = [
    {
      title: 'Lieu de départ',
      dataIndex: 'beginningPlace',
      key: 'beginningPlace'
    },
    {
      title: "Lieu d'arrivée",
      dataIndex: 'endingPlace',
      key: 'endingPlace'
    },
    {
      title: 'Durée',
      dataIndex: 'duration',
      key: 'duration'
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const rotationTimeMetadata = getModelMetadata('RotationTime')

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
