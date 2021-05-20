// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// API
import { serializers } from 'pages/api/docks/[[...index]]'

// I18n
import './Dock.i18n'

// Templates
import { ModelList } from 'templates'

const Docks = ({ model = {} }) => {
  const { t } = useTranslation('Dock')

  return <ModelList t={t} model={model} />
}

export const getServerSideProps = async () => {
  const dockMetadata = getModelMetadata('Dock')

  return {
    props: {
      model: { ...dockMetadata, serializers }
    }
  }
}

export default Docks
