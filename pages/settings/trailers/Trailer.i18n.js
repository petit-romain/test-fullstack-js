import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Trailer', {
  name: 'Brouette',
  name_plural: 'Brouettes',
  fields: {
    transporter: {
      title: 'Nom du transporteur'
    },
    licensePlate: {
      title: "Plaque d'immatriculation"
    }
  }
})
i18next.addResourceBundle('en', 'Trailer', {
  name: 'Trailer',
  name_plural: 'Trailers',
  fields: {
    transporter: {
      title: 'Transporter name'
    },
    licensePlate: {
      title: 'License plate'
    }
  }
})
