const users = [
  {
    where: {
      email: 'romain.p@ubidreams.com'
    },
    create: {
      email: 'romain.p@ubidreams.com',
      firstName: 'Romain',
      lastName: 'P',
      roles: ['UBIADMIN']
    }
  },
  {
    where: {
      email: 'romain.m@ubidreams.com'
    },
    create: {
      email: 'romain.m@ubidreams.com',
      firstName: 'Romain',
      lastName: 'M',
      roles: ['SUPERADMIN']
    }
  },
  {
    where: {
      email: 'ahmed.k@ubidreams.com'
    },
    create: {
      email: 'ahmed.k@ubidreams.com',
      firstName: 'Ahmed',
      lastName: 'K',
      roles: ['ADMIN']
    }
  },
  {
    where: {
      email: 'damien.a@ubidreams.com'
    },
    create: {
      email: 'damien.a@ubidreams.com',
      firstName: 'Damien',
      lastName: 'A',
      roles: ['MANAGER']
    }
  },
  {
    where: {
      email: 'quentin.c@ubidreams.com'
    },
    create: {
      email: 'quentin.c@ubidreams.com',
      firstName: 'Quentin',
      lastName: 'C',
      roles: ['READER']
    }
  }
]

module.exports = users
