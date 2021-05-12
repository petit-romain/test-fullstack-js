import { defaultTo, find, includes, isEmpty, keys, map, reject } from 'lodash'

const sorter = (a = {}, b = {}, field) => {
  switch (field?.type) {
    case 'String':
      return defaultTo(a?.key, '').localeCompare(defaultTo(b?.key, ''))
    case 'Integer':
      return defaultTo(a?.key, 0) - defaultTo(b?.key, 0)
    default:
      return defaultTo(a?.key?.length, []) - defaultTo(b?.key?.length, [])
  }
}

const filters = (field) => {
  let choices = defaultTo(field?.choices, [])

  if (field?.name === 'roles')
    choices = reject(choices, (choice) => choice === 'UBIADMIN')

  return map(choices, (choice) => ({
    text: choice,
    value: choice
  }))
}

export const formatColumns = (model, data, t) => {
  const dataFields = keys(defaultTo(data?.results?.pop(), {}))

  return map(dataFields, (fieldKey) => {
    const field = find(defaultTo(model?.fields, []), ['name', fieldKey])
    const fieldName = defaultTo(field?.name, '')

    const isFieldSortable = includes(['String', 'Integer'], field?.type)
    const isFieldFilterable = !isEmpty(field?.choices) && field?.kind === 'enum'

    return {
      title: t(`fields.${fieldName}.title`),
      dataIndex: fieldName,
      key: fieldName,
      sorter: isFieldSortable ? (a, b) => sorter(a, b, field) : null,
      filters: isFieldFilterable ? filters(field) : null
    }
  })
}
