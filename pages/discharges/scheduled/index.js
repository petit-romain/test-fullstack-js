// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// I18n
import './Scheduled.i18n'

const ScheduledDischarge = () => {
  const { t } = useTranslation('Dock')

  return <div>{t('title')}</div>
}

export default ScheduledDischarge
