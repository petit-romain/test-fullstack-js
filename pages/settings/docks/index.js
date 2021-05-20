// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'
import { map } from 'lodash'

import prisma from 'lib/prisma'

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

  const boxs = await prisma.box.findMany()

  dockMetadata.fields = map(dockMetadata.fields, (field) =>
    field?.name === 'box' ? { ...field, choices: boxs, label: 'name' } : field
  )

  return {
    props: {
      model: { ...dockMetadata, serializers }
    }
  }
}

export default Docks
