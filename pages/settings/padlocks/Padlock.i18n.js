import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Padlock', {
  name: 'Cadenas',
  name_plural: 'Cadenas',
  table: {
    nbElement: '{{ count }} cadenas à afficher',
    nbElement_plural: '{{ count }} cadenas à afficher',
    search: 'Recherchez un cadenas'
  },
  fields: {
    name: {
      title: 'Nom'
    },
    reference: {
      title: 'Référence'
    }
  }
})
i18next.addResourceBundle('en', 'Padlock', {
  name: 'Padlock',
  name_plural: 'Padlocks',
  table: {
    nbElement: '{{ count }} padlocks to display',
    nbElement_plural: '{{ count }} padlocks to display',
    search: 'Find a padlock'
  },
  fields: {
    name: {
      title: 'Name'
    },
    reference: {
      title: 'Reference'
    }
  }
})
