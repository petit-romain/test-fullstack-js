import prisma from 'lib/prisma'
import { defaultTo, find, map } from 'lodash'

export const getModelMetaData = (modelName) => {
  const prismaModels = prisma._dmmf.datamodel.models
  const prismaEnums = prisma._dmmf.datamodel.enums

  const model = find(prismaModels, ['name', modelName])

  const fields = map(defaultTo(model?.fields, []), (field) => {
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
  })

  return {
    name: modelName,
    fields
  }
}
