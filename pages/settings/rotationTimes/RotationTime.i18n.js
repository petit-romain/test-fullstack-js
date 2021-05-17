import i18next from 'i18next'

i18next.addResourceBundle('fr', 'RotationTime', {
  name: 'Temps de rotation',
  name_plural: 'Temps de rotation',
  table: {
    nbElement: '{{ count }} temps de rotation à afficher',
    nbElement_plural: '{{ count }} temps de rotation à afficher',
    search: 'Recherchez un temps de rotation'
  },
  modals: {
    create: {
      title: 'Créer un temps de rotation'
    },
    update: {
      title: 'Modifier un temps de rotation'
    }
  },
  fields: {
    beginPlace: {
      title: 'Lieu de départ'
    },
    endingPlace: {
      title: "Lieu d'arrivée"
    },
    duration: {
      title: 'Durée'
    }
  }
})
i18next.addResourceBundle('en', 'RotationTime', {
  name: 'Rotation time',
  name_plural: 'Rotation times',
  table: {
    nbElement: '{{ count }} rotation time to display',
    nbElement_plural: '{{ count }} rotation times to display',
    search: 'Find a rotation time'
  },
  modals: {
    create: {
      title: 'Rotation time creation'
    },
    update: {
      title: 'Rotation time update'
    }
  },
  fields: {
    beginPlace: {
      title: 'Begin place'
    },
    endingPlace: {
      title: 'Ending place'
    },
    duration: {
      title: 'Duration'
    }
  }
})
