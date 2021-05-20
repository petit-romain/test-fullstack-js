// Libraries
import React, { useEffect } from 'react'
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  Radio
} from 'antd'
import {
  defaultTo,
  includes,
  isEmpty,
  isObject,
  isString,
  map,
  reject
} from 'lodash'

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
          const fieldChoices = defaultTo(field?.choices, [])

          const placeholder = t(`FormLayout:input.placeholder`, {
            fieldName: t(`fields.${field?.name}.title`).toLowerCase()
          })

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

              {/* Object Enums field */}
              {!isEmpty(fieldChoices) && isObject(fieldChoices[0]) && (
                <Select
                  allowClear
                  mode={field?.isList ? 'multiple' : 'single'}
                  placeholder={placeholder}
                >
                  {map(fieldChoices, (choice) => (
                    <Select.Option key={choice?.id}>
                      {choice[field?.label]}
                    </Select.Option>
                  ))}
                </Select>
              )}

              {/* String enums */}
              {!isEmpty(fieldChoices) && isString(fieldChoices[0]) && (
                <Radio.Group>
                  {map(fieldChoices, (choice) => (
                    <Radio value={choice}>
                      {t(`fields.${field?.name}.${choice}`)}
                    </Radio>
                  ))}
                </Radio.Group>
              )}

              {/* Datetime field */}
              {field?.type === 'DateTime' &&
                includes(field?.name.toLowerCase(), 'date') && (
                  <DatePicker placeholder={placeholder} />
                )}

              {/* Time field */}
              {field?.type === 'DateTime' &&
                includes(field?.name.toLowerCase(), 'time') && (
                  <TimePicker placeholder={placeholder} />
                )}
            </Form.Item>
          )
        })}
      </Form>
    </Card>
  )
}

export default FormLayout
