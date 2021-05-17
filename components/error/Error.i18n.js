import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Error', {
  404: {
    title: 'Erreur | Page non trouvé',
    description: "Désolé, la page que vous avez demandée n'existe pas"
  },
  500: {
    title: 'Erreur | Serveur interne',
    description: 'Désolé, une erreur serveur interne est apparue'
  }
})
