// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getSession } from 'next-auth/client'
import { defaultTo, find, includes, map, merge, reject } from 'lodash'

// Helpers
import { getModelMetadata, prismaEnums } from 'helpers/prisma'

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

export const getServerSideProps = async (context) => {
  const userMetadata = getModelMetadata('User')

  const roleEnums = reject(
    map(defaultTo(find(prismaEnums, ['name', 'Role'])?.values, []), 'name'),
    (role) => role === 'UBIADMIN'
  )

  userMetadata.fields = map(userMetadata.fields, (field) =>
    field?.name === 'roles' ? { ...field, choices: roleEnums } : field
  )

  return {
    props: {
      model: { ...userMetadata, serializers }
    }
  }
}

export default Users
