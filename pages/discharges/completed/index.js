// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// I18n
import './Completed.i18n'

const CompletedDischarge = () => {
  const { t } = useTranslation('Dock')

  return <div>{t('title')}</div>
}

export default CompletedDischarge
