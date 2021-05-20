// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// API
import { serializers } from 'pages/api/trailers/[[...index]]'

// I18n
import './Trailer.i18n'

// Templates
import { ModelList } from 'templates'

const Trailers = ({ model = {} }) => {
  const { t } = useTranslation('Trailer')

  return <ModelList t={t} model={model} />
}

export const getServerSideProps = async () => {
  const trailerMetadata = getModelMetadata('Trailer')

  return {
    props: {
      model: { ...trailerMetadata, serializers }
    }
  }
}

export default Trailers
