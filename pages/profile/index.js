// Libraries
import React from 'react'
import { useTranslation } from 'react-i18next'

// I18n
import './Profile.i18n'

const Profile = ({ model = {} }) => {
  const { t } = useTranslation('Profile')

  return <div>Profile page</div>
}

export default Profile
