// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// I18n
import './Active.i18n'

const ActiveDischarge = () => {
  const { t } = useTranslation('Dock')

  return <div>{t('title')}</div>
}

export default ActiveDischarge
