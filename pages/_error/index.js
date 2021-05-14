// Libraries
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// Configs
import i18nConfig from 'configs/i18n.config'

// Components
import Error from 'components/error'

const ErrorPage = ({ statusCode }) => {
  return <Error statusCode={statusCode} />
}

export const getServerSideProps = async ({ res, locale, err }) => {
  const translations = await serverSideTranslations(
    locale,
    ['Common'],
    i18nConfig
  )

  return {
    props: {
      ...translations,
      statusCode: res ? res.statusCode : err ? err.statusCode : 404
    }
  }
}

export default ErrorPage
