// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// API
import { serializers } from 'pages/api/boxs/[[...index]]'

// I18n
import './Box.i18n'

// Templates
import { ModelList } from 'templates'

const Boxs = ({ model = {} }) => {
  const { t } = useTranslation('Box')

  return <ModelList t={t} model={model} />
}

export const getServerSideProps = async () => {
  const boxMetadata = getModelMetadata('box')

  return {
    props: {
      model: { ...boxMetadata, serializers }
    }
  }
}

export default Boxs
