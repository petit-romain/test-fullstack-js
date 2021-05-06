import React from 'react'

import { TableLayout } from 'components/index'
import { getModelMetadata } from 'helpers/prisma'

const Trailers = ({ model = {} }) => {
  const columns = [
    {
      title: 'Nom du transporteur',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: "N° d'immatriculation",
      dataIndex: 'immatriculation',
      key: 'immatriculation'
    }
  ]

  return <TableLayout model={model} columns={columns} />
}

export const getServerSideProps = async () => {
  const trailerMetadata = getModelMetadata('Trailer')

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
