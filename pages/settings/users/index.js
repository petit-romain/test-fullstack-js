// Libraries
import React, { Fragment } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { map } from 'lodash'
import { Tag } from 'antd'

// Configs
import i18nConfig from 'configs/i18n.config'

// Helpers
import { getModelMetadata } from 'helpers/prisma'

// Components
import TableLayout from 'components/table'

const Users = ({ model = {} }) => {
  const { t } = useTranslation('User')

  return <TableLayout t={t} model={model} />
}

export const getServerSideProps = async ({ locale }) => {
  const userMetadata = getModelMetadata('User')

  const translations = await serverSideTranslations(
    locale,
    ['User', 'Common'],
    i18nConfig
  )

  return {
    props: {
      model: {
        ...userMetadata,
        blackListFields: [
          'email',
          'emailVerified',
          'image',
          'createdAt',
          'updatedAt'
        ]
      },
      ...translations
    }
  }
}

export default Users
