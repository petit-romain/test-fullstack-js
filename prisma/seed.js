const { PrismaClient } = require('@prisma/client')
const { forEach } = require('lodash')

const { users } = require('./fixtures')

const prisma = new PrismaClient()

const main = async () => {
  forEach(users, async (user) => {
    await prisma.user.upsert({ ...user, update: {} })
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
