// Libraries
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

// Configs
import i18nConfig from 'configs/i18n.config'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// Components
import TableLayout from 'components/table'

const RotationTimes = ({ model = {} }) => {
  const { t } = useTranslation('RotationTime')

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

  return <TableLayout t={t} model={model} columns={columns} />
}

export const getServerSideProps = async ({ locale }) => {
  const rotationTimeMetadata = getModelMetadata('RotationTime')

  const translations = await serverSideTranslations(
    locale,
    ['RotationTime', 'Common'],
    i18nConfig
  )

  return {
    props: {
      model: {
        ...rotationTimeMetadata,
        blackListFields: []
      },
      ...translations
    }
  }
}

export default RotationTimes
