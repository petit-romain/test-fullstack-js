// Libraries
import { defaultTo, isNil, replace } from 'lodash'

import prisma from 'lib/prisma'

// Helpers
import { formatFilters, formatSerializer } from 'helpers/prisma'

export default async (model, serializers, req, res) => {
  const { query } = req

  const filters = JSON.parse(defaultTo(query?.filters, '{}'))

  const conditions = formatFilters(filters)

  const selectedFields = formatSerializer('list', serializers)

  const sortOrder = replace(defaultTo(query?.sortOrder, 'ascend'), 'end', '')

  const [modelsCount, models] = await prisma.$transaction([
    prisma[model].count({ where: conditions }),
    prisma[model].findMany({
      take: parseInt(defaultTo(query?.limit, '10')),
      skip: parseInt(defaultTo(query?.offset, '0')),
      select: selectedFields,
      where: conditions,
      orderBy: isNil(query?.sortField) ? {} : { [query?.sortField]: sortOrder }
    })
  ])

  res.status(206).json({
    total: modelsCount,
    results: models
  })
}
