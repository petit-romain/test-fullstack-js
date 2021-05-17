import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Box', {
  name: 'Boîtier',
  name_plural: 'Boîtiers',
  table: {
    nbElement: '{{ count }} boîtier à afficher',
    nbElement_plural: '{{ count }} boîtiers à afficher',
    search: 'Recherchez un boîtier'
  },
  fields: {
    name: {
      title: 'Nom'
    },
    devEUI: {
      title: 'Identifiant LoRa'
    },
    serialNumber: {
      title: 'Numéro de série'
    },
    box: {
      title: 'Boîtier'
    }
  }
})
i18next.addResourceBundle('en', 'Box', {
  name: 'Box',
  name_plural: 'Boxs',
  table: {
    nbElement: '{{ count }} box to display',
    nbElement_plural: '{{ count }} boxs to display',
    search: 'Find a box'
  },
  fields: {
    name: {
      title: 'Name'
    },
    devEUI: {
      title: 'LoRa ID'
    },
    serialNumber: {
      title: 'Serial number'
    },
    box: {
      title: 'Box'
    }
  }
})
