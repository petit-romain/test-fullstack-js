import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Trailer', {
  name: 'Brouette',
  name_plural: 'Brouettes',
  table: {
    nbElement: '{{ count }} brouette à afficher',
    nbElement_plural: '{{ count }} brouettes à afficher',
    search: 'Recherchez une brouette'
  },
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
  table: {
    nbElement: '{{ count }} trailer to display',
    nbElement_plural: '{{ count }} trailers to display',
    search: 'Find a trailer'
  },
  fields: {
    transporter: {
      title: 'Transporter name'
    },
    licensePlate: {
      title: 'License plate'
    }
  }
})
