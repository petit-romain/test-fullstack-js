// Libraries
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import prisma from 'lib/prisma'

// Configs
import i18nConfig from 'configs/i18n.config'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// Components
import TableLayout from 'components/table'
import { defaultTo, map, merge } from 'lodash'

const Docks = ({ model = {} }) => {
  const { t } = useTranslation('Dock')

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Boîtier',
      dataIndex: 'box',
      key: 'box'
    }
  ]

  return <TableLayout t={t} model={model} columns={columns} />
}

export const getServerSideProps = async ({ locale }) => {
  const boxs = await prisma.box.findMany()

  const dockMetadata = getModelMetadata('Dock')

  dockMetadata.fields = map(defaultTo(dockMetadata?.fields, []), (field) =>
    field?.name === 'box'
      ? merge(field, { kind: 'enum', choices: boxs, selectLabel: 'name' })
      : field
  )

  const translations = await serverSideTranslations(
    locale,
    ['Dock', 'Common'],
    i18nConfig
  )

  return {
    props: {
      model: {
        ...dockMetadata,
        blackListFields: []
      },
      ...translations
    }
  }
}

export default Docks
