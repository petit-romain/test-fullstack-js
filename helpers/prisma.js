// Libraries
import prisma from 'lib/prisma'
import {
  constant,
  defaultTo,
  find,
  forEach,
  isEmpty,
  map,
  reduce,
  times,
  zipObject
} from 'lodash'

export const prismaModels = prisma._dmmf.datamodel.models
export const prismaEnums = prisma._dmmf.datamodel.enums

export const getModelMetadata = (modelName) => {
  const model = find(prismaModels, ['name', modelName])

  const fields = map(defaultTo(model?.fields, []), (field) =>
    getModelFieldMetadata(model, field?.name)
  )

  return {
    name: modelName,
    fields
  }
}

export const getModelFieldMetadata = (model, fieldName) => {
  return find(model?.fields, ['name', fieldName])
}

export const formatFilters = (filters) => {
  const formattedFilters = reduce(
    filters,
    (result, value, key) => {
      forEach(value, (v) => {
        result.push({
          [key]: {
            equals: v
          }
        })
      })
      return result
    },
    []
  )

  return isEmpty(formattedFilters)
    ? {}
    : {
        OR: formattedFilters
      }
}

export const formatSerializer = (service, serializers) => {
  const fields = defaultTo(serializers?.[service], [])

  return zipObject(fields, times(fields.length, constant(true)))
}
