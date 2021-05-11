// Libraries
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import i18nConfig from 'configs/i18n.config'

// Components
import { TableLayout } from 'components/index'

const Trailers = ({ model = {} }) => {
  const { t } = useTranslation('Trailer')

  const columns = [
    {
      title: t('fields.transporter.title'),
      dataIndex: 'transporter',
      key: 'transporter'
    },
    {
      title: t('fields.licensePlate.title'),
      dataIndex: 'licensePlate',
      key: 'licensePlate'
    }
  ]

  return <TableLayout t={t} model={model} columns={columns} />
}

export const getServerSideProps = async ({ locale }) => {
  const trailerMetadata = getModelMetadata('Trailer')

  const translations = await serverSideTranslations(
    locale,
    ['Trailer', 'Common'],
    i18nConfig
  )

  return {
    props: {
      model: {
        ...trailerMetadata,
        blackListFields: []
      },
      ...translations
    }
  }
}

export default Trailers
