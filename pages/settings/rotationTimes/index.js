// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './RotationTime.i18n'

// Components
import TableLayout from 'components/table'

const RotationTimes = ({ model = {} }) => {
  const { t } = useTranslation('RotationTime')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const rotationTimeMetadata = getModelMetadata('RotationTime')

  return {
    props: {
      model: rotationTimeMetadata
    }
  }
}

export default RotationTimes
