const { PrismaClient } = require('@prisma/client')

const { users } = require('./fixtures')

const prisma = new PrismaClient()

const main = async () => {
  for (const user of users) {
    await prisma.user.upsert({ ...user, update: {} })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
