// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'
import { map } from 'lodash'

import prisma from 'lib/prisma'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// API
import { serializers } from 'pages/api/weighingareas/[[...index]]'

// I18n
import './WeighingArea.i18n'

// Templates
import { ModelList } from 'templates'

const WeighingAreas = ({ model = {} }) => {
  const { t } = useTranslation('WeighingArea')

  return <ModelList t={t} model={model} />
}

export const getServerSideProps = async () => {
  const weighingAreaMetadata = getModelMetadata('WeighingArea')

  const boxs = await prisma.box.findMany()

  weighingAreaMetadata.fields = map(weighingAreaMetadata.fields, (field) =>
    field?.name === 'box' ? { ...field, choices: boxs, label: 'name' } : field
  )

  return {
    props: {
      model: { ...weighingAreaMetadata, serializers }
    }
  }
}

export default WeighingAreas
