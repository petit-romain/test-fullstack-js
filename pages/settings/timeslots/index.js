// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './Timeslot.i18n'

// Components
import TableLayout from 'components/table'

const Timeslots = ({ model = {} }) => {
  const { t } = useTranslation('Timeslot')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const timeslotMetadata = getModelMetadata('Timeslot')

  return {
    props: {
      model: timeslotMetadata
    }
  }
}

export default Timeslots
