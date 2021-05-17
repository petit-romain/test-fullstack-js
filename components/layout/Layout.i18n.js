import i18next from 'i18next'

i18next.addResourceBundle('fr', 'Layout', {
  breadcrumb: {
    profile: 'Page de profil',
    logout: 'Déconnexion',
    version: 'Version {{ version }}'
  },
  sider: {
    dashboard: 'Dashboard',
    settings: {
      title: 'Paramètres',
      warehouses: 'Magasins',
      weighingsArea: 'Zones de pesée',
      trailers: 'Brouettes',
      timeslots: 'Plages horaires',
      docks: 'Quais',
      rotationTimes: 'Temps de rotation',
      boxs: 'Boîtiers',
      padlocks: 'Cadenas',
      users: 'Utilisateurs'
    },
    discharges: {
      title: 'Déchargements',
      active: 'Actifs',
      scheduled: 'Programmés',
      completed: 'Terminés'
    }
  }
})

i18next.addResourceBundle('en', 'Layout', {
  breadcrumb: {
    profile: 'Profile page',
    logout: 'Logout',
    version: 'Version {{ version }}'
  },
  sider: {
    dashboard: 'Dashboard',
    settings: {
      title: 'Settings',
      warehouses: 'Warehouses',
      weighingsArea: 'Weighing Areas',
      trailers: 'Trailers',
      timeslots: 'Time slots',
      docks: 'Docks',
      rotationTimes: 'Rotation Times',
      boxs: 'Boxs',
      padlocks: 'Padlocks',
      users: 'Users'
    },
    discharges: {
      title: 'Discharges',
      active: 'Actives',
      scheduled: 'Scheduled',
      completed: 'Completed'
    }
  }
})
