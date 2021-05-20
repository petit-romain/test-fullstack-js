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
  },
  api: {
    success: {
      update: 'Profil modifié avec succès'
    },
    error: {
      update: 'Une erreur est survenue lors de la modification de votre profil'
    }
  }
})

i18next.addResourceBundle('en', 'Profile', {
  action: {
    setPassword: 'Update your password',
    updateProfile: 'Update profile'
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
  },
  api: {
    success: {
      update: 'Profile updated'
    },
    error: {
      update: 'An error occurred on profile update'
    }
  }
})
