// Libraries
import nextConnect from 'next-connect'

import prisma from 'lib/prisma'
import { defaultTo } from 'lodash'

// Middlewares
import { Authentication, Permissions } from 'middlewares'

// Helpers
import paginate from 'helpers/pagination'
import { formatSerializer } from 'helpers/prisma'

export const serializers = {
  list: ['id', 'firstName', 'lastName', 'email', 'roles'],
  create: ['id', 'firstName', 'lastName', 'email', 'roles'],
  update: ['id', 'firstName', 'lastName', 'email', 'roles']
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
  .get('api/users', async (req, res, next) => {
    const pagination = await paginate('user', serializers, req)
    return res.status(206).json(pagination)
  })
  .get('api/users/:id', async (req, res) => {
    const id = parseInt(req?.params?.id)

    const selectedFields = formatSerializer('retrieve', serializers)

    const padlock = await prisma.user.findUnique({
      select: selectedFields,
      where: { id }
    })

    res.status(200).json(padlock)
  })
  .patch('api/users/:id', async (req, res) => {
    const id = parseInt(req?.params?.id)
    const body = defaultTo(req?.body, {})

    const selectedFields = formatSerializer('update', serializers)

    const user = await prisma.user.update({
      select: selectedFields,
      where: { id },
      data: body
    })

    res.status(200).json(user)
  })
