// Librairies
import React, { useCallback, useEffect } from 'react'
import { Form, Input, message, Modal, Select } from 'antd'
import { defaultTo, filter, includes, isEmpty, map } from 'lodash'

import { creater, updater } from 'lib/swr'

// Components
const { Option } = Select

const ManageModel = ({
  visible,
  model,
  modelItem,
  mutate,
  url,
  onVisibleChange
}) => {
  const [form] = Form.useForm()

  const modelFields = filter(
    defaultTo(model?.fields, []),
    ({ name }) =>
      !includes(['id', ...defaultTo(model?.blackListFields, [])], name)
  )
  useEffect(() => {
    form.setFieldsValue(modelItem)
  }, [modelItem])

  const isCreating = isEmpty(modelItem)

  const renderField = useCallback(
    ({ fieldName, choices, isList, ...field }) => {
      switch (field?.kind) {
        case 'enum':
          return (
            <Select
              allowClear
              mode={isList ? 'multiple' : 'single'}
              placeholder={`Sélectionner un ${fieldName}`}
            >
              {map(choices, (choice) => (
                <Option key={choice}>{choice}</Option>
              ))}
            </Select>
          )
        case 'scalar':
          return <Input placeholder={`Renseignez un ${fieldName}`} />
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
          success: model?.modelName + ' créé(e) avec succès',
          error: "Erreur lors de la création de/d'un " + model?.modelName
        }
      },
      update: {
        promise: updater,
        messages: {
          success: model?.modelName + ' modifié(e) avec succès',
          error: "Erreur lors de la modification de/d'un " + model?.modelName
        }
      }
    }

    const manageMethod = !isCreating
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
      title={`${isCreating ? 'Créer' : 'Modifier'} un(e) ${model?.modelName}`}
      okText={isCreating ? 'Créer' : 'Modifier'}
      onOk={() => {
        form.validateFields().then((formData) => {
          manageModel(formData)
        })
      }}
      cancelText='Annuler'
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

            let rules = [
              {
                required: isRequired,
                message: `Veuillez renseigner un ${fieldName}`
              }
            ]

            if (includes(fieldName, 'mail') && type === 'String') {
              rules = [
                ...rules,
                {
                  type: 'email',
                  message: `Le champs ${fieldName} doit être une adresse mail`
                }
              ]
            }

            return (
              <Form.Item
                key={index}
                name={fieldName}
                label={fieldName}
                rules={rules}
              >
                {renderField({
                  ...field,
                  kind,
                  fieldName,
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
