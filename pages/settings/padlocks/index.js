// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// API
import { serializers } from 'pages/api/padlocks/[[...index]]'

// I18n
import './Padlock.i18n'

// Templates
import { ModelList } from 'templates'

const Padlocks = ({ model = {} }) => {
  const { t } = useTranslation('Padlock')

  return <ModelList t={t} model={model} />
}

export const getServerSideProps = async () => {
  const padlockMetadata = getModelMetadata('Padlock')

  return {
    props: {
      model: { ...padlockMetadata, serializers }
    }
  }
}

export default Padlocks
