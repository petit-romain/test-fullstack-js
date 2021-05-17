// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// I18n
import './User.i18n'

// Components
import TableLayout from 'components/table'

const Users = ({ model = {} }) => {
  const { t } = useTranslation('User')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async () => {
  const userMetadata = getModelMetadata('User')

  return {
    props: {
      model: userMetadata
    }
  }
}

export default Users
