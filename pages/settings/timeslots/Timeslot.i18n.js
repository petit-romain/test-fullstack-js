import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Timeslot', {
  name: 'Plage horaire',
  name_plural: 'Plages horaires',
  table: {
    nbElement: '{{ count }} plage horaire à afficher',
    nbElement_plural: '{{ count }} plages horaires à afficher',
    search: 'Recherchez une plage horaire'
  },
  fields: {
    name: {
      title: 'Nom'
    },
    beginTime: {
      title: 'Heure de début'
    },
    endTime: {
      title: 'Heure de fin'
    }
  }
})
i18next.addResourceBundle('en', 'Timeslot', {
  name: 'Timeslot',
  name_plural: 'Timeslots',
  table: {
    nbElement: '{{ count }} timeslot to display',
    nbElement_plural: '{{ count }} timeslots to display',
    search: 'Find a timeslot'
  },
  fields: {
    name: {
      title: 'Name'
    },
    beginTime: {
      title: 'Begin time'
    },
    endingTime: {
      title: 'Ending time'
    }
  }
})
