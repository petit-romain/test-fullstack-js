import i18next from 'i18next'

i18next.addResourceBundle('fr', 'ManageUserPassword', {
  title: 'Modifer mot de passe',
  action: {
    setPassword: 'Modifier mot de passe'
  },
  fields: {
    currentPassword: {
      title: 'Mot de passe actuel'
    },
    newPassword: {
      title: 'Nouveau mot de passe'
    },
    confirmedPassword: {
      title: 'Mot de passe confirmé'
    }
  }
})

i18next.addResourceBundle('en', 'ManageUserPassword', {
  title: 'Set password',
  action: {
    setPassword: 'Set password'
  }
})
