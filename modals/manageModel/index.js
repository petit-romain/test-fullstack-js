// Librairies
import React, { useCallback, useEffect } from 'react'
import { Form, message, Modal } from 'antd'
import { capitalize, defaultTo, includes, isEmpty, map } from 'lodash'

import { creater, updater } from 'lib/swr'

// Helpers
import { filterModelFields, renderModelField } from 'helpers/manageModel'

// I18n
import './ManageModel.i18n'

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

  const modelFields = filterModelFields(model, 'create')

  useEffect(() => {
    form.setFieldsValue(modelItem)
  }, [modelItem])

  const isUpdating = !isEmpty(modelItem)

  const manageModel = useCallback(async (formData) => {
    mutate(url, formData, false)

    const manageMethods = {
      create: {
        promise: creater,
        messages: {
          success: t('Common:api.success.create', {
            modelName: capitalize(t('name'))
          }),
          error: t('Common:api.error.create', {
            modelName: t('name').toLowerCase()
          })
        }
      },
      update: {
        promise: updater,
        messages: {
          success: t('Common:api.success.update', {
            modelName: capitalize(t('name'))
          }),
          error: t('Common:api.error.update', {
            modelName: t('name').toLowerCase()
          })
        }
      }
    }

    const manageMethod = isUpdating
      ? manageMethods?.update
      : manageMethods?.create

    mutate(url, manageMethod?.promise(url, formData))
      .then(() => message.success(manageMethod?.messages?.success))
      .catch((err) => {
        err?.response?.status === 400 &&
          message.error(manageMethod?.messages?.error)
      })
  }, [])

  return (
    <Modal
      visible={visible}
      forceRender
      title={isUpdating ? t('modals.update.title') : t('modals.create.title')}
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
        {map(modelFields, (field, index) => {
          const fieldName = defaultTo(field?.name, '')
          const fieldNameTranslated = t(`fields.${fieldName}.title`)

          let rules = [
            {
              required: defaultTo(field?.isRequired, false),
              message: t('ManageModel:form.requiredMessage', {
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
                message: t('ManageModel:form.patternMessage.email', {
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
              {renderModelField(
                {
                  ...field,
                  fieldName,
                  fieldNameTranslated
                },
                t
              )}
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
