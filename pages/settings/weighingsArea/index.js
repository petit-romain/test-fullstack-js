// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

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

  return {
    props: {
      model: { ...weighingAreaMetadata, serializers }
    }
  }
}

export default WeighingAreas
