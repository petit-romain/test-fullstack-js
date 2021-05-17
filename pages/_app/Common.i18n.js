import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Common', {
  app: {
    loading: 'Chargement en cours ...',
    logo: "Logo de l'application",
    welcome: 'Bienvenue sur {{ appName }}'
  },
  action: {
    create: 'Créer',
    update: 'Modifier',
    cancel: 'Annuler',
    next: 'Suivant',
    backHome: "Retourner à l'accueil"
  },
  api: {
    success: {
      create: '{{ modelName }} créé(e) avec succès',
      update: '{{ modelName }} mis(e) à jour avec succès'
    },
    error: {
      create:
        "Une erreur est survenue lors de la création d'un(e) {{ modelName }}",
      update:
        "Une erreur est survenue lors de la modification d'un(e) {{ modelName }}",
      '401': 'Votre session a expiré, veuillez vous reconnecter',
      '403': "Vous n'avez pas la permission d'effectuer cette action",
      '404': "Désolé, cette action n'existe pas"
    }
  }
})

i18next.addResourceBundle('en', 'Common', {
  app: {
    loading: 'Loading ...',
    logo: 'Application logo',
    welcome: 'Welcome on {{ appName }}'
  },
  action: {
    create: 'Create',
    update: 'Update',
    cancel: 'Cancel',
    next: 'Next',
    backHome: 'Back home page'
  },
  api: {
    success: {
      create: '{{ modelName }} created with success',
      update: '{{ modelName }} updated with success'
    },
    error: {
      create: 'An error occurred on {{ modelName }} creation',
      update: 'An error occurred on {{ modelName }} update',
      '401': 'Your session has expired, you have to loggin again',
      '403': 'You do not have permission to perform this action',
      '404': 'Sorry, this action does not exist'
    }
  }
})
