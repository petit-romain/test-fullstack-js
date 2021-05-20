// Libraries
import React, { useEffect } from 'react'
import { Button, Card, DatePicker, Form, Input, Select, TimePicker } from 'antd'
import { defaultTo, includes, isEmpty, map } from 'lodash'

// Helpers
import { filterModelFields } from 'helpers/form'

// I18n
import './Form.i18n'

// Styles
import './Form.less'

const FormLayout = ({ t, model }) => {
  /* Form information */
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(model)
  }, [model])

  /* Model Information */
  const isCreating = isEmpty(model)
  const modelFields = filterModelFields(model, isCreating ? 'create' : 'update')

  return (
    <Card
      className='form-layout'
      bordered={false}
      actions={[
        <Button key='manage-button' type='primary'>
          {isCreating ? t('Common:action.create') : t('Common:action.update')}
        </Button>
      ]}
    >
      <Form form={form} layout='vertical'>
        {map(modelFields, (field, index) => {
          const isFieldRequired = defaultTo(field?.isRequired, false)

          let rules = [
            {
              required: isFieldRequired,
              message: t(`FormLayout:requiredMessage`, {
                fieldName: t(`fields.${field?.name}.title`).toLowerCase()
              })
            }
          ]

          if (includes(field?.name, 'mail') && field?.type === 'String') {
            rules = [
              ...rules,
              {
                type: 'email',
                message: t(`FormLayout:patternMessage.email`, {
                  fieldName: t(`fields.${field?.name}.title`).toLowerCase()
                })
              }
            ]
          }

          const placeholder = t(`FormLayout:input.placeholder`, {
            fieldName: t(`fields.${field?.name}.title`).toLowerCase()
          })

          return (
            <Form.Item
              key={index}
              name={field?.name}
              label={t(`fields.${field?.name}.title`)}
              rules={rules}
              required={isFieldRequired}
            >
              {/* Simple input field (String) */}
              {field?.type === 'String' && <Input placeholder={placeholder} />}

              {/* Enum field */}
              {field?.kind === 'enum' && (
                <Select
                  allowClear
                  mode={field?.isList ? 'multiple' : 'single'}
                  placeholder={placeholder}
                >
                  {map(defaultTo(field?.choices, []), (choice) => (
                    <Select.Option key={choice}>{choice}</Select.Option>
                  ))}
                </Select>
              )}

              {/* Datetime and Time field */}
              {field?.type === 'DateTime' ||
              includes(field?.name.toLowerCase(), 'time') ? (
                <TimePicker placeholder={placeholder} />
              ) : (
                includes(field?.name.toLowerCase(), 'date') && (
                  <DatePicker placeholder={placeholder} />
                )
              )}
            </Form.Item>
          )
        })}
      </Form>
    </Card>
  )
}

export default FormLayout
