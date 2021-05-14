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
import { defaultTo, map, merge } from 'lodash'

const Warehouses = ({ model = {} }) => {
  const { t } = useTranslation('Warehouse')

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Portes',
      dataIndex: 'gates',
      key: 'gates'
    }
  ]

  return <TableLayout t={t} model={model} columns={columns} />
}

export const getServerSideProps = async ({ locale }) => {
  const warehouseMetadata = getModelMetadata('Warehouse')

  warehouseMetadata.fields = map(
    defaultTo(warehouseMetadata?.fields, []),
    (field) =>
      field?.name === 'gates' ? merge(field, { objectLabel: 'name' }) : field
  )

  const translations = await serverSideTranslations(
    locale,
    ['Warehouse', 'Common'],
    i18nConfig
  )

  return {
    props: {
      model: {
        ...warehouseMetadata,
        blackListFields: []
      },
      ...translations
    }
  }
}

export default Warehouses
