// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'
import { defaultTo, map, merge } from 'lodash'

import prisma from 'lib/prisma'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './WeighingArea.i18n'

// Components
import TableLayout from 'components/table'

const WeighingsArea = ({ model = {} }) => {
  const { t } = useTranslation('WeighingArea')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const boxs = await prisma.box.findMany()

  const weighingAreaMetadata = getModelMetadata('WeighingArea')

  weighingAreaMetadata.fields = map(
    defaultTo(weighingAreaMetadata?.fields, []),
    (field) =>
      field?.name === 'box'
        ? merge(field, {
            choices: boxs,
            label: 'name'
          })
        : field
  )

  return {
    props: {
      model: {
        ...weighingAreaMetadata,
        blackListFields: []
      }
    }
  }
}

export default WeighingsArea
