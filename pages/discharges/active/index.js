// Libraries
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

// Configs
import i18nConfig from 'configs/i18n.config'

const ActiveDischarge = () => {
  const { t } = useTranslation('Dock')

  return <div>Active Discharge page</div>
}

export const getServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(
    locale,
    ['Discharge', 'Common'],
    i18nConfig
  )

  return {
    props: translations
  }
}

export default ActiveDischarge
