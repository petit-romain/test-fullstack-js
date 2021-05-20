// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// API
import { serializers } from 'pages/api/rotationtimes/[[...index]]'

// I18n
import './RotationTime.i18n'

// Templates
import { ModelList } from 'templates'

const RotationTimes = ({ model = {} }) => {
  const { t } = useTranslation('RotationTime')

  return <ModelList t={t} model={model} />
}

export const getServerSideProps = async () => {
  const rotationTimeMetadata = getModelMetadata('RotationTime')

  return {
    props: {
      model: { ...rotationTimeMetadata, serializers }
    }
  }
}

export default RotationTimes
