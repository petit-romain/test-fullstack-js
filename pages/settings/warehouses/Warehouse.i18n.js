import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Warehouse', {
  name: 'Magasin',
  name_plural: 'Magasins',
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
  fields: {
    name: {
      title: 'Name'
    },
    gates: {
      title: 'Gates'
    }
  }
})
