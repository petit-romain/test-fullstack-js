import i18next from 'i18next'

i18next.addResourceBundle('fr', 'SignIn', {
  api: {
    success: {
      login: 'Connexion réusssie'
    },
    error: {
      NOT_FOUND: 'Compte introuvable'
    }
  },
  fields: {
    login: {
      title: "Nom d'utilisateur",
      placeholder: "Renseignez un nom d'utilisateur",
      requiredMessage: "Veuillez renseigner un nom d'utilisateur"
    },
    password: {
      title: 'Mot de passe',
      placeholder: 'Renseignez un mot de passe',
      requiredMessage: 'Veuillez renseigner un mot de passe'
    }
  }
})
i18next.addResourceBundle('en', 'SignIn', {
  api: {
    success: {
      login: 'Login succeed'
    },
    error: {
      NOT_FOUND: 'Account not found'
    }
  },
  fields: {
    login: {
      title: 'Login',
      placeholder: 'Inquire a login',
      requiredMessage: 'You have to inquire a login'
    },
    password: {
      title: 'Password',
      placeholder: 'Inquire a password',
      requiredMessage: 'You have to inquire a password'
    }
  }
})
