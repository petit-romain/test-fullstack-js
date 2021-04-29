const { PrismaClient } = require('@prisma/client')
const { map } = require('lodash')

const { users } = require('./fixtures')

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({ ...users[0], update: {} })
  await prisma.user.upsert({ ...users[1], update: {} })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
