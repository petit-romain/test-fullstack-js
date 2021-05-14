// Libraries
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

// Configs
import i18nConfig from 'configs/i18n.config'

const Dashboard = ({ model = {} }) => {
  const { t } = useTranslation('Dock')

  return <div>Dashboard</div>
}

export const getServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(
    locale,
    ['Dashboard', 'Common'],
    i18nConfig
  )

  return {
    props: translations
  }
}

export default Dashboard
