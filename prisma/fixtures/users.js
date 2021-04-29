const users = [
  {
    where: {
      email: 'alice@prisma.io'
    },
    create: {
      email: 'alice@prisma.io',
      name: 'Alice'
    }
  },
  {
    where: {
      email: 'bob@prisma.io'
    },
    create: {
      email: `bob@prisma.io`,
      name: 'Bob'
    }
  }
]

module.exports = users
