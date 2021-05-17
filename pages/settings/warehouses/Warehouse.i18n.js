import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Warehouse', {
  name: 'Magasin',
  name_plural: 'Magasins',
  table: {
    nbElement: '{{ count }} magasin à afficher',
    nbElement_plural: '{{ count }} magasins à afficher',
    search: 'Recherchez un magasin'
  },
  fields: {
    name: {
      title: 'Nom'
    },
    gates: {
      title: 'Portes'
    }
  }
})
i18next.addResourceBundle('en', 'Warehouse', {
  name: 'Warehouse',
  name_plural: 'Warehouses',
  table: {
    nbElement: '{{ count }} warehouse to display',
    nbElement_plural: '{{ count }} warehouses to display',
    search: 'Find a warehouse'
  },
  fields: {
    name: {
      title: 'Name'
    },
    gates: {
      title: 'Gates'
    }
  }
})
