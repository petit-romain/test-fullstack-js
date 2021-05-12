import { defaultTo, filter, includes, isArray, isEmpty, isNil } from 'lodash'

export const filterModelFields = (model) =>
  filter(defaultTo(model?.fields, []), ({ name, relationToFields }) => {
    const isIdField = includes(name.toLowerCase(), 'id')
    const isBlacklistedField = includes(
      defaultTo(model?.blackListFields, []),
      name
    )
    const isRelationToFieldsId =
      isArray(relationToFields) && !isEmpty(relationToFields)

    return (
      (!isIdField && !isBlacklistedField && isNil(relationToFields)) ||
      isRelationToFieldsId
    )
  })
