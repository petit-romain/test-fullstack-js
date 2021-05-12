// Libraries
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

// Configs
import i18nConfig from 'configs/i18n.config'

// Components
import Error from 'components/error'

const InternalServerErrorPage = () => {
  const { t } = useTranslation('Common')

  console.warn(t)

  return <Error t={t} statusCode={500} />
}

export const getServerSideProps = async ({ res, err, locale }) => {
  const translations = await serverSideTranslations(
    locale,
    ['Common'],
    i18nConfig
  )

  return {
    props: {
      statusCode: res ? res?.statusCode : err ? err?.statusCode : 404,
      ...translations
    }
  }
}

export default InternalServerErrorPage
