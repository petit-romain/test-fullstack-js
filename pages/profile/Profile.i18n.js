import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Profile', {
  action: {
    setPassword: 'Modifier mon mot de passe',
    updateProfile: 'Mettre à jour le profil'
  },
  fields: {
    email: {
      title: 'Adresse mail'
    },
    firstName: {
      title: 'Prénom'
    },
    lastName: {
      title: 'Nom'
    }
  }
})

i18next.addResourceBundle('en', 'Profile', {
  action: {
    updatePassword: 'Update your password'
  },
  fields: {
    email: {
      title: 'Email address'
    },
    firstName: {
      title: 'Firstname'
    },
    lastName: {
      title: 'Lastname'
    }
  }
})
