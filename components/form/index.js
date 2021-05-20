// Libraries
import React, { useEffect } from 'react'
import { Button, Card, Form, Input } from 'antd'
import { defaultTo, isEmpty, map } from 'lodash'

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

          const rules = [
            {
              required: isFieldRequired,
              message: t(`FormLayout:requiredMessage`, {
                fieldName: t(`fields.${field?.name}.title`).toLowerCase()
              })
            }
          ]

          return (
            <Form.Item
              key={index}
              label={t(`fields.${field?.name}.title`)}
              rules={rules}
              required={isFieldRequired}
            >
              {/* Simple input field (String) */}
              {field?.type === 'String' && (
                <Input
                  placeholder={t(`FormLayout:input.placeholder`, {
                    fieldName: t(`fields.${field?.name}.title`).toLowerCase()
                  })}
                />
              )}
            </Form.Item>
          )
        })}
      </Form>
    </Card>
  )
}

export default FormLayout
