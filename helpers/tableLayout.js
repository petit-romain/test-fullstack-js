import { defaultTo, map, reject } from 'lodash'

export const sorter = (a = {}, b = {}, field) => {
  switch (field?.type) {
    case 'String':
      return defaultTo(a?.key, '').localeCompare(defaultTo(b?.key, ''))
    case 'Integer':
      return defaultTo(a?.key, 0) - defaultTo(b?.key, 0)
    default:
      return null
  }
}

export const filter = (field) => {
  let choices = defaultTo(field?.choices, [])

  if (field?.name === 'roles')
    choices = reject(choices, (choice) => choice === 'UBIADMIN')

  return map(choices, (choice) => ({
    text: choice,
    value: choice
  }))
}
