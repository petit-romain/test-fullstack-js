// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './Box.i18n'

// Components
import TableLayout from 'components/table'

const Boxes = ({ model = {} }) => {
  const { t } = useTranslation('Box')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const boxMetadata = getModelMetadata('Box')

  return {
    props: {
      model: {
        ...boxMetadata,
        blackListFields: []
      }
    }
  }
}

export default Boxes
