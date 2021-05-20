import i18next from 'i18next'

i18next.addResourceBundle('fr', 'User', {
  name: 'Utilisateur',
  name_plural: 'Utilisateurs',
  table: {
    nbElement: '{{ count }} utilisateur à afficher',
    nbElement_plural: '{{ count }} utilisateurs à afficher',
    search: 'Recherchez un utilisateur'
  },
  modals: {
    create: {
      title: 'Créer un utilisateur'
    },
    update: {
      title: 'Modifier un utilisateur'
    }
  },
  fields: {
    firstName: {
      title: 'Prénom'
    },
    lastName: {
      title: 'Nom'
    },
    email: {
      title: 'Adresse mail'
    },
    roles: {
      title: 'Rôles',
      UBIADMIN: 'Administrateur Ubidreams',
      SUPERADMIN: 'Super Administrateur',
      ADMIN: 'Administrateur',
      MANAGER: 'Gestionnaire',
      READER: 'Lecteur'
    }
  }
})

i18next.addResourceBundle('en', 'User', {
  name: 'User',
  name_plural: 'Users',
  table: {
    nbElement: '{{ count }} user to display',
    nbElement_plural: '{{ count }} users to display',
    search: 'Recherchez un utilisateur'
  },
  modals: {
    create: {
      title: 'User creation'
    },
    update: {
      title: 'User update'
    }
  },
  fields: {
    firstName: {
      title: 'First name'
    },
    lastName: {
      title: 'Last name'
    },
    email: {
      title: 'Mail address'
    },
    roles: {
      title: 'Roles',
      UBIADMIN: 'Ubidreams Administrator',
      SUPERADMIN: 'Super Administrator',
      ADMIN: 'Administrator',
      MANAGER: 'Manager',
      READER: 'Reader'
    }
  }
})
