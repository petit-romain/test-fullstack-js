// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './Padlock.i18n'

// Components
import TableLayout from 'components/table'

const Padlocks = ({ model = {} }) => {
  const { t } = useTranslation('Padlock')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const padlockMetadata = getModelMetadata('Padlock')

  return {
    props: {
      model: {
        ...padlockMetadata,
        blackListFields: []
      }
    }
  }
}

export default Padlocks
