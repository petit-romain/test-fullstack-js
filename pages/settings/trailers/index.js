// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './Trailer.i18n'

// Components
import TableLayout from 'components/table'

const Trailers = ({ model = {} }) => {
  const { t } = useTranslation('Trailer')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const trailerMetadata = getModelMetadata('Trailer')

  return {
    props: {
      model: {
        ...trailerMetadata,
        blackListFields: []
      }
    }
  }
}

export default Trailers
