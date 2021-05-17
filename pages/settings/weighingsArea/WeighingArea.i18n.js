import i18next from 'i18next'

i18next.addResourceBundle('fr', 'WeighingArea', {
  name: 'Zone de pesée',
  name_plural: 'Zones de pesée',
  table: {
    nbElement: '{{ count }} zone de pesée à afficher',
    nbElement_plural: '{{ count }} zones de pesée à afficher',
    search: 'Recherchez une zone de pesée'
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
i18next.addResourceBundle('en', 'WeighingArea', {
  name: 'Weighing Area',
  name_plural: 'Weighing Areas',
  table: {
    nbElement: '{{ count }} weighing area to display',
    nbElement_plural: '{{ count }} weighing areas to display',
    search: 'Find a weighing area'
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
