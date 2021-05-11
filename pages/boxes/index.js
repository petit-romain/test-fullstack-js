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

const Boxes = ({ model = {} }) => {
  const { t } = useTranslation('Box')

  const columns = [
    {
      title: 'Numéro de série',
      dataIndex: 'serialNumber',
      key: 'serialNumber'
    },
    {
      title: 'Identifiant Lora',
      dataIndex: 'deviceAddress',
      key: 'deviceAddress'
    },
    {
      title: 'Lieu associé',
      dataIndex: 'box',
      key: 'box'
    }
  ]

  return <TableLayout t={t} model={model} columns={columns} />
}

export const getServerSideProps = async ({ locale }) => {
  const boxMetadata = getModelMetadata('Box')

  const translations = await serverSideTranslations(
    locale,
    ['Box', 'Common'],
    i18nConfig
  )

  return {
    props: {
      model: {
        ...boxMetadata,
        blackListFields: []
      },
      ...translations
    }
  }
}

export default Boxes
