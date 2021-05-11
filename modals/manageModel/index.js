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

  const renderField = useCallback(
    ({ fieldName, fieldNameTranslated, choices, isList, ...field }) => {
      switch (field?.kind) {
        case 'enum':
          return (
            <Select
              allowClear
              mode={isList ? 'multiple' : 'single'}
              placeholder={t('Common:form.select.placeholder', {
                fieldName: fieldNameTranslated.toLowerCase()
              })}
            >
              {map(choices, (choice) => (
                <Option key={choice}>{choice}</Option>
              ))}
            </Select>
          )
        case 'scalar':
          return (
            <Input
              placeholder={t('Common:form.input.placeholder', {
                fieldName: fieldNameTranslated.toLowerCase()
              })}
            />
          )
        default:
          return <Input />
      }
    },
    []
  )

  const manageModel = useCallback(async (formData) => {
    mutate(url, formData, false)

    const manageMethods = {
      create: {
        promise: creater,
        messages: {
          success: t('Common:api.success.create', {
            modelName: capitalize(model?.modelNameTranslated)
          }),
          error: t('Common:api.error.create', {
            modelName: model?.modelNameTranslated.toLowerCase()
          })
        }
      },
      update: {
        promise: updater,
        messages: {
          success: t('Common:api.success.update', {
            modelName: capitalize(model?.modelNameTranslated)
          }),
          error: t('Common:api.error.update', {
            modelName: model?.modelNameTranslated.toLowerCase()
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
      } un(e) ${model?.modelNameTranslated.toLowerCase()}`}
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
        {map(
          modelFields,
          ({ kind, type, choices, isRequired, ...field }, index) => {
            const fieldName = defaultTo(field?.name, '')
            const fieldNameTranslated = t(`fields.${fieldName}.title`)

            let rules = [
              {
                required: isRequired,
                message: t('Common:form.requiredMessage', {
                  fieldName: fieldNameTranslated.toLowerCase()
                })
              }
            ]

            if (includes(fieldName, 'mail') && type === 'String') {
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
                  kind,
                  fieldName,
                  fieldNameTranslated,
                  isRequired,
                  choices
                })}
              </Form.Item>
            )
          }
        )}
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
