// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './WeighingArea.i18n'

// Components
import TableLayout from 'components/table'

const WeighingsArea = ({ model = {} }) => {
  const { t } = useTranslation('WeighingArea')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const weighingAreaMetadata = getModelMetadata('WeighingArea')

  return {
    props: {
      model: weighingAreaMetadata
    }
  }
}

export default WeighingsArea
