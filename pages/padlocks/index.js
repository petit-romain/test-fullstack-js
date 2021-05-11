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

const Padlocks = ({ model = {} }) => {
  const { t } = useTranslation('Padlock')

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Référence',
      dataIndex: 'reference',
      key: 'reference'
    }
  ]

  return <TableLayout t={t} model={model} columns={columns} />
}

export const getServerSideProps = async ({ locale }) => {
  const padlockMetadata = getModelMetadata('Padlock')

  const translations = await serverSideTranslations(
    locale,
    ['Padlock', 'Common'],
    i18nConfig
  )

  return {
    props: {
      model: {
        ...padlockMetadata,
        blackListFields: []
      },
      ...translations
    }
  }
}

export default Padlocks
