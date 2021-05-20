// Libraries
import nextConnect from 'next-connect'

import prisma from 'lib/prisma'

// Middlewares
import { Authentication, Permissions } from 'middlewares'

// Helpers
import paginate from 'helpers/pagination'
import { formatSerializer } from 'helpers/prisma'

export const serializers = {
  list: ['id', 'name', 'beginTime', 'endTime'],
  retrieve: ['id', 'name', 'beginTime', 'endTime'],
  create: ['id', 'name', 'beginTime', 'endTime'],
  update: ['id', 'name', 'beginTime', 'endTime']
}

export const permissions = {
  list: ['UBIADMIN', 'SUPERADMIN', 'ADMIN', 'MANAGER', 'READER'],
  retrieve: ['UBIADMIN', 'SUPERADMIN', 'ADMIN', 'MANAGER', 'READER']
}

export default nextConnect({
  attachParams: true
})
  .use([
    Authentication,
    (req, res, next) => Permissions(req, res, next, permissions)
  ])
  .get('api/timeslots', async (req, res, next) => {
    const pagination = await paginate('timeslot', serializers, req)
    return res.status(206).json(pagination)
  })
  .get('api/timeslots/:id', async (req, res) => {
    const id = parseInt(req?.params?.id)

    const selectedFields = formatSerializer('retrieve', serializers)

    const padlock = await prisma.timeslot.findUnique({
      select: selectedFields,
      where: { id }
    })

    res.status(200).json(padlock)
  })
