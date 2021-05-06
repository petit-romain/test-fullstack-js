import React from 'react'

import { TableLayout } from 'components/index'
import { getModelMetadata } from 'helpers/prisma'

const Timeslots = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Heure de début',
      dataIndex: 'beginningDate',
      key: 'beginningDate'
    },
    {
      title: 'Heure de fin',
      dataIndex: 'endingDate',
      key: 'endingDate'
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const timeslotMetadata = getModelMetadata('Timeslot')

  return {
    props: {
      model: {
        ...timeslotMetadata,
        blackListFields: []
      }
    }
  }
}

export default Timeslots
