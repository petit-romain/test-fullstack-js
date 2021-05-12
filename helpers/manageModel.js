import React from 'react'
import {
  defaultTo,
  filter,
  includes,
  isArray,
  isEmpty,
  isNil,
  map
} from 'lodash'
import { Input, Select } from 'antd'

const { Option } = Select

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

export const renderModelField = (field, t) => {
  switch (field?.kind) {
    case 'enum':
      return (
        <Select
          allowClear
          mode={field?.isList ? 'multiple' : 'single'}
          placeholder={t('Common:form.select.placeholder', {
            fieldName: field?.fieldNameTranslated.toLowerCase()
          })}
        >
          {map(field?.choices, (choice) => (
            <Option key={choice}>{choice}</Option>
          ))}
        </Select>
      )
    case 'scalar':
      return (
        <Input
          placeholder={t('Common:form.input.placeholder', {
            fieldName: field?.fieldNameTranslated.toLowerCase()
          })}
        />
      )
    default:
      return <Input />
  }
}
