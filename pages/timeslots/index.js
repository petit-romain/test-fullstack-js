import React from 'react'
import { defaultTo } from 'lodash'

import { TableLayout } from 'components/index'
import { getModelMetaData } from '../../helpers/prisma'

const Timeslots = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) =>
        defaultTo(a?.name, '').localeCompare(defaultTo(b?.name, ''))
    },
    {
      title: 'Heure de début',
      dataIndex: 'beginningDate',
      key: 'beginningDate',
      sorter: (a, b) =>
        defaultTo(a?.beginningDate, '').localeCompare(
          defaultTo(b?.beginningDate, '')
        )
    },
    {
      title: 'Heure de fin',
      dataIndex: 'endingDate',
      key: 'endingDate',
      sorter: (a, b) =>
        defaultTo(a?.endingDate, '').localeCompare(defaultTo(b?.endingDate, ''))
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const timeslotMetadata = getModelMetaData('Timeslot')

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
