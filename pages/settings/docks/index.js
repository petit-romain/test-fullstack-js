// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './Dock.i18n'

// Components
import TableLayout from 'components/table'

const Docks = ({ model = {} }) => {
  const { t } = useTranslation('Dock')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const dockMetadata = getModelMetadata('Dock')

  return {
    props: {
      model: dockMetadata
    }
  }
}

export default Docks
