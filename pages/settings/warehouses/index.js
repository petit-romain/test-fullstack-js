// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './Warehouse.i18n'

// Components
import TableLayout from 'components/table'

const Warehouses = ({ model = {} }) => {
  const { t } = useTranslation('Warehouse')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const warehouseMetadata = getModelMetadata('Warehouse')

  return {
    props: {
      model: warehouseMetadata
    }
  }
}

export default Warehouses
