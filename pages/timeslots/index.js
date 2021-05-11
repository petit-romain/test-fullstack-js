// Libraries
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

// Configs
import i18nConfig from '../../configs/i18n.config'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// Components
import TableLayout from 'components/table'

const Timeslots = ({ model = {} }) => {
  const { t } = useTranslation('Timeslot')

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Heure de début',
      dataIndex: 'beginningDate',
      key: 'beginningDate'
    },
    {
      title: 'Heure de fin',
      dataIndex: 'endingDate',
      key: 'endingDate'
    }
  ]

  return <TableLayout t={t} model={model} columns={columns} />
}

export const getServerSideProps = async ({ locale }) => {
  const timeslotMetadata = getModelMetadata('Timeslot')

  const translations = await serverSideTranslations(
    locale,
    ['Timeslot', 'Common'],
    i18nConfig
  )

  return {
    props: {
      model: {
        ...timeslotMetadata,
        blackListFields: []
      },
      ...translations
    }
  }
}

export default Timeslots
