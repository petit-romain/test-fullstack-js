import prisma from 'lib/prisma'
import { defaultTo, find, map } from 'lodash'

export const getModelMetadata = (modelName) => {
  const prismaModels = prisma._dmmf.datamodel.models

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
  const prismaEnums = prisma._dmmf.datamodel.enums

  const field = find(model?.fields, ['name', fieldName])

  const choices =
    field?.kind === 'enum'
      ? find(prismaEnums, ['name', field?.type]).values
      : []

  return {
    ...field,
    kind: field?.kind,
    type: field?.type,
    choices: field?.kind === 'enum' ? map(choices, 'name') : []
  }
}
