// Librairies
import React, { useCallback, useEffect } from 'react'
import { Form, Input, message, Modal, Select } from 'antd'
import {
  capitalize,
  defaultTo,
  filter,
  includes,
  isArray,
  isEmpty,
  isNil,
  isPlainObject,
  map
} from 'lodash'

import { creater, updater } from 'lib/swr'

// Components
const { Option } = Select

const ManageModel = ({
  visible,
  t,
  model,
  modelItem,
  mutate,
  url,
  onVisibleChange
}) => {
  const [form] = Form.useForm()

  const modelFields = filter(
    defaultTo(model?.fields, []),
    ({ name, relationToFields }) =>
      (!includes(name.toLowerCase(), 'id') &&
        !includes(defaultTo(model?.blackListFields, []), name) &&
        isNil(relationToFields)) ||
      (isArray(relationToFields) && !isEmpty(relationToFields))
  )

  useEffect(() => {
    form.setFieldsValue(modelItem)
  }, [modelItem])

  const isUpdating = !isEmpty(modelItem)

  const renderField = useCallback((field) => {
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
            {map(defaultTo(field?.choices, []), (choice) => (
              <Option
                key={
                  isPlainObject(choice)
                    ? choice[defaultTo(choice?.selectKey, 'id')]
                    : choice
                }
              >
                {isPlainObject(choice) ? choice[field?.selectLabel] : choice}
              </Option>
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
  }, [])

  const manageModel = useCallback(async (formData) => {
    mutate(url, formData, false)

    const manageMethods = {
      create: {
        promise: creater,
        messages: {
          success: t('Common:api.success.create', {
            modelName: capitalize(model?.modelNameTranslated.single)
          }),
          error: t('Common:api.error.create', {
            modelName: model?.modelNameTranslated.single.toLowerCase()
          })
        }
      },
      update: {
        promise: updater,
        messages: {
          success: t('Common:api.success.update', {
            modelName: capitalize(model?.modelNameTranslated.single)
          }),
          error: t('Common:api.error.update', {
            modelName: model?.modelNameTranslated.single.toLowerCase()
          })
        }
      }
    }

    const manageMethod = isUpdating
      ? manageMethods?.update
      : manageMethods?.create

    manageMethod
      ?.promise(url, formData)
      .then(() => message.success(manageMethod?.messages?.success))
      .catch(() => message.error(manageMethod?.messages?.error))

    mutate(url)
  }, [])

  return (
    <Modal
      visible={visible}
      forceRender
      title={`${
        isUpdating ? t('Common:action.update') : t('Common:action.create')
      } un(e) ${model?.modelNameTranslated.single.toLowerCase()}`}
      okText={
        isUpdating ? t('Common:action.update') : t('Common:action.create')
      }
      onOk={() => {
        form.validateFields().then((formData) => {
          manageModel(formData)
        })
      }}
      cancelText={t('Common:action.cancel')}
      onCancel={() => {
        form.resetFields()
        onVisibleChange(false)
      }}
    >
      <Form form={form} layout='vertical'>
        {map(modelFields, ({ kind, ...field }, index) => {
          const fieldName = defaultTo(field?.name, '')
          const fieldNameTranslated = t(`fields.${fieldName}.title`)

          let rules = [
            {
              required: defaultTo(field?.isRequired, false),
              message: t('Common:form.requiredMessage', {
                fieldName: fieldNameTranslated.toLowerCase()
              })
            }
          ]

          if (
            includes(fieldName, 'mail') &&
            defaultTo(field?.type, 'String') === 'String'
          ) {
            rules = [
              ...rules,
              {
                type: 'email',
                message: t('Common:form.patternMessage.required', {
                  fieldName: fieldNameTranslated.toLowerCase()
                })
              }
            ]
          }

          return (
            <Form.Item
              key={index}
              name={fieldName}
              label={fieldNameTranslated}
              rules={rules}
            >
              {renderField({
                ...field,
                fieldName,
                fieldNameTranslated
              })}
            </Form.Item>
          )
        })}
      </Form>
    </Modal>
  )
}

ManageModel.defaultProps = {
  visible: false,
  model: {},
  modelItem: {},
  mutate: () => {},
  onVisibleChange: () => {}
}

export default ManageModel
