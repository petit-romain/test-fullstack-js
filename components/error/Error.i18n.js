import i18next from 'lib/i18n'

i18next.addResourceBundle('fr', 'Error', {
  '404': {
    title: 'Erreur | Page non trouvé',
    description: "Désolé, la page que vous avez demandée n'existe pas"
  },
  '500': {
    title: 'Erreur | Serveur interne',
    description: 'Désolé, une erreur serveur interne est apparue'
  }
})

i18next.addResourceBundle('en', 'Error', {
  '404': {
    title: 'Error | Page not found',
    description: 'Sorry, this page does not exist'
  },
  '500': {
    title: 'Error | Internal server',
    description: 'Sorry, an internal server error occurred'
  }
})
