import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Box', {
  name: 'Boîtier',
  name_plural: 'Boîtiers',
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
