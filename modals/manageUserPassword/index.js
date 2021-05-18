// Librairies
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Input, Modal } from 'antd'

// I18n
import './ManageUserPassword.i18n'

const ManageUserPassword = ({ visible = false, onCancel = () => {} }) => {
  const [form] = Form.useForm()
  const { t } = useTranslation('ManageUserPassword')

  return (
    <Modal
      visible={visible}
      title={t('title')}
      okText={t('action.setPassword')}
      onCancel={onCancel}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='currentPassword'
          label={t('fields.currentPassword.title')}
          rules={[
            {
              required: true,
              message: t('ManageModel:form.requiredMessage', {
                fieldName: t('fields.currentPassword.title').toLowerCase()
              })
            }
          ]}
        >
          <Input
            placeholder={t('ManageModel:form.input.placeholder', {
              fieldName: t('fields.currentPassword.title').toLowerCase()
            })}
          />
        </Form.Item>
        <Form.Item
          name='newPassword'
          label={t('fields.newPassword.title')}
          rules={[
            {
              required: true,
              message: t('ManageModel:form.requiredMessage', {
                fieldName: t('fields.newPassword.title').toLowerCase()
              })
            }
          ]}
        >
          <Input
            placeholder={t('ManageModel:form.input.placeholder', {
              fieldName: t('fields.newPassword.title').toLowerCase()
            })}
          />
        </Form.Item>
        <Form.Item
          name='confirmedPassword'
          label={t('fields.confirmedPassword.title')}
          rules={[
            {
              required: true,
              message: t('ManageModel:form.requiredMessage', {
                fieldName: t('fields.confirmedPassword.title').toLowerCase()
              })
            },
            {
              type: 'email',
              message: t('ManageModel:form.patternMessage.email', {
                fieldName: t('fields.confirmedPassword.title').toLowerCase()
              })
            }
          ]}
        >
          <Input
            placeholder={t('ManageModel:form.input.placeholder', {
              fieldName: t('fields.confirmedPassword.title').toLowerCase()
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ManageUserPassword
