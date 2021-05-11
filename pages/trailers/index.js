// Libraries
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import i18nConfig from 'configs/i18n.config'

// Components
import { TableLayout } from 'components/index'

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

export const getServerSideProps = async ({ locale }) => {
  const trailerMetadata = getModelMetadata('Trailer')

  const test = await serverSideTranslations(locale, ['Common'], i18nConfig)

  console.log(test)

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
