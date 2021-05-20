import { defaultTo, isEmpty, isNil, isPlainObject, map, omitBy } from 'lodash'

export const formatQueryParams = (pagination, filters, sorter) => {
  const limit = defaultTo(pagination?.pageSize, 10)
  const filteredFilters = omitBy(filters, isNil)
  const sortOrder = sorter?.order

  const params = omitBy(
    {
      limit,
      offset: defaultTo((pagination?.current - 1) * limit, 0),
      filters: isEmpty(filteredFilters) ? null : filteredFilters,
      sortField: isNil(sortOrder) ? null : sorter?.columnKey,
      sortOrder
    },
    isNil
  )

  const query = map(params, (value, key) => {
    return `&${key}=${isPlainObject(value) ? JSON.stringify(value) : value}`
  }).join('')

  return `?${query}`
}
