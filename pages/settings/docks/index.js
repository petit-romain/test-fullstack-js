// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

import prisma from 'lib/prisma'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './Dock.i18n'

// Components
import TableLayout from 'components/table'
import { defaultTo, map, merge } from 'lodash'

const Docks = ({ model = {} }) => {
  const { t } = useTranslation('Dock')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const boxs = await prisma.box.findMany()

  const dockMetadata = getModelMetadata('Dock')

  dockMetadata.fields = map(defaultTo(dockMetadata?.fields, []), (field) =>
    field?.name === 'box'
      ? merge(field, { kind: 'enum', choices: boxs, label: 'name' })
      : field
  )

  return {
    props: {
      model: {
        ...dockMetadata,
        blackListFields: []
      }
    }
  }
}

export default Docks
