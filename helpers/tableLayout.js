// Libraries
import React from 'react'
import {
  defaultTo,
  filter,
  find,
  includes,
  isEmpty,
  keys,
  map,
  reject
} from 'lodash'
import moment from 'moment'
import { Tag } from 'antd'

const sorter = (a = {}, b = {}, field) => {
  switch (field?.type) {
    case 'String':
    case 'DateTime':
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

const renderColumn = (field, value, record) => {
  if (field?.kind === 'object') {
    if (field?.isList) {
      return map(value, (v, index) => (
        <Tag key={index}>{v[defaultTo(field?.label, 'id')]}</Tag>
      ))
    } else {
      return <Tag>{value[defaultTo(field?.label, 'id')]}</Tag>
    }
  } else if (field?.type === 'DateTime') {
    return includes(field?.fieldName.toLowerCase(), 'time')
      ? moment(value).format('LT')
      : moment(value).format('L')
  } else {
    return value
  }
}

export const formatColumns = (model, data, t) => {
  const dataFields = filter(
    keys(defaultTo(data?.results?.pop(), {})),
    (key) => !includes(key.toLowerCase(), 'id')
  )

  return map(dataFields, (fieldKey) => {
    const field = find(defaultTo(model?.fields, []), ['name', fieldKey])
    const fieldName = defaultTo(field?.name, '')

    const isFieldSortable =
      includes(['String', 'Integer', 'DateTime'], field?.type) ||
      field?.kind === 'object'

    const isFieldFilterable = !isEmpty(field?.choices) && field?.kind === 'enum'

    const key = field?.kind === 'object' ? `box.name` : fieldName

    return {
      title: t(`fields.${fieldName}.title`),
      dataIndex: fieldName,
      key,
      sorter: isFieldSortable ? (a, b) => sorter(a, b, field) : null,
      filters: isFieldFilterable ? filters(field) : null,
      render: (value, record) =>
        renderColumn({ ...field, fieldName }, value, record)
    }
  })
}
