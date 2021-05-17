import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Padlock', {
  name: 'Cadenas',
  name_plural: 'Cadenas',
  table: {
    nbElement: '{{ count }} cadenas à afficher',
    nbElement_plural: '{{ count }} cadenas à afficher',
    search: 'Recherchez un cadenas'
  },
  modals: {
    create: {
      title: 'Créer un cadenas'
    },
    update: {
      title: 'Modifier un cadenas'
    }
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
  modals: {
    create: {
      title: 'Padlock creation'
    },
    update: {
      title: 'Padlock update'
    }
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
