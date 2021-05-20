// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// API
import { serializers } from 'pages/api/users/[[...index]]'

// I18n
import './User.i18n'

// Templates
import { ModelList } from 'templates'

const Users = ({ model = {} }) => {
  const { t } = useTranslation('User')

  return <ModelList t={t} model={model} />
}

export const getServerSideProps = async () => {
  const userMetadata = getModelMetadata('User')

  return {
    props: {
      model: { ...userMetadata, serializers }
    }
  }
}

export default Users
