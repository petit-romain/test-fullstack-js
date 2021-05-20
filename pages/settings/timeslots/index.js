// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// API
import { serializers } from 'pages/api/timeslots/[[...index]]'

// I18n
import './Timeslot.i18n'

// Templates
import { ModelList } from 'templates'

const Timeslots = ({ model = {} }) => {
  const { t } = useTranslation('Timeslot')

  return <ModelList t={t} model={model} />
}

export const getServerSideProps = async () => {
  const timeslotMetadata = getModelMetadata('Timeslot')

  return {
    props: {
      model: { ...timeslotMetadata, serializers }
    }
  }
}

export default Timeslots
