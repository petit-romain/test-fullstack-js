import React from 'react'
import { defaultTo } from 'lodash'

import { TableLayout } from 'components/index'
import { getModelMetaData } from '../../helpers/prisma'

const Trailers = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom du transporteur',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) =>
        defaultTo(a?.name, '').localeCompare(defaultTo(b?.name, ''))
    },
    {
      title: "N° d'immatriculation",
      dataIndex: 'immatriculation',
      key: 'immatriculation',
      sorter: (a, b) =>
        defaultTo(a?.immatriculation, '').localeCompare(
          defaultTo(b?.immatriculation, '')
        )
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const trailerMetadata = getModelMetaData('Trailer')

  return {
    props: {
      model: {
        ...trailerMetadata,
        blackListFields: []
      }
    }
  }
}

export default Trailers
