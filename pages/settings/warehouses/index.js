// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// API
import { serializers } from 'pages/api/warehouses/[[...index]]'

// I18n
import './Warehouse.i18n'

// Templates
import { ModelList } from 'templates'

const Warehouses = ({ model = {} }) => {
  const { t } = useTranslation('Warehouse')

  return <ModelList t={t} model={model} />
}

export const getServerSideProps = async () => {
  const warehouseMetadata = getModelMetadata('Warehouse')

  return {
    props: {
      model: { ...warehouseMetadata, serializers }
    }
  }
}

export default Warehouses
