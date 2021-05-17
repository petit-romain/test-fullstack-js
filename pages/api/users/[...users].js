// Libraries
import nextConnect from 'next-connect'

import prisma from 'lib/prisma'

// Middlewares
import { Authentication, Permissions } from 'middlewares'

// Helpers
import paginate from 'helpers/pagination'
import { formatSerializer } from 'helpers/prisma'

const serializers = {
  list: ['id', 'name', 'beginTime', 'endTime'],
  retrieve: ['id', 'name', 'beginTime', 'endTime']
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
  .get('api/trailers', async (req, res, next) => {
    const pagination = await paginate('trailer', serializers, req)
    return res.status(206).json(pagination)
  })
  .get('api/trailers/:id', async (req, res) => {
    const id = parseInt(req?.params?.id)

    const selectedFields = formatSerializer('retrieve', serializers)

    const padlock = await prisma.trailer.findUnique({
      select: selectedFields,
      where: { id }
    })

    res.status(200).json(padlock)
  })
