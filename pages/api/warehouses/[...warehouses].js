// Libraries
import nextConnect from 'next-connect'

import prisma from 'lib/prisma'

// Middlewares
import { Authentication, Permissions } from 'middlewares'

// Helpers
import paginate from 'helpers/pagination'
import { formatSerializer } from 'helpers/prisma'

const serializers = {
  list: ['id', 'name', 'gates'],
  retrieve: ['id', 'name', 'gates']
}

const permissions = {
  list: ['READER'],
  retrieve: ['READER']
}

export default nextConnect({
  attachParams: true
})
  .use([
    Authentication,
    (req, res, next) => Permissions(req, res, next, permissions)
  ])
  .get('api/warehouses', async (req, res, next) => {
    const pagination = await paginate('warehouse', serializers, req)
    return res.status(206).json(pagination)
  })
  .get('api/warehouses/:id', async (req, res) => {
    const id = parseInt(req?.params?.id)

    const selectedFields = formatSerializer('retrieve', serializers)

    const padlock = await prisma.warehouse.findUnique({
      select: selectedFields,
      where: { id }
    })

    res.status(200).json(padlock)
  })
