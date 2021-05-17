import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Timeslot', {
  name: 'Plage horaire',
  name_plural: 'Plages horaires',
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
  name: 'Plage horaire',
  name_plural: 'Plages horaires',
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
