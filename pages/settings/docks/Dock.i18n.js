import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Dock', {
  name: 'Quai',
  name_plural: 'Quais',
  table: {
    nbElement: '{{ count }} quai à afficher',
    nbElement_plural: '{{ count }} quais à afficher',
    search: 'Recherchez un quai'
  },
  fields: {
    name: {
      title: 'Nom'
    },
    box: {
      title: 'Boîtier'
    }
  }
})
i18next.addResourceBundle('en', 'Dock', {
  name: 'Dock',
  name_plural: 'Docks',
  table: {
    nbElement: '{{ count }} dock to display',
    nbElement_plural: '{{ count }} docks to display',
    search: 'Find a dock'
  },
  fields: {
    name: {
      title: 'Name'
    },
    box: {
      title: 'Box'
    }
  }
})
