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

const prismaModels = prisma._dmmf.datamodel.models
const prismaEnums = prisma._dmmf.datamodel.enums

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
  const field = find(model?.fields, ['name', fieldName])

  const choices =
    field?.kind === 'enum'
      ? find(prismaEnums, ['name', field?.type]).values
      : []

  const object = field?.kind === 'object' ? {} : {}

  return {
    ...field,
    kind: field?.kind,
    type: field?.type,
    choices: field?.kind === 'enum' ? map(choices, 'name') : [],
    object
  }
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
