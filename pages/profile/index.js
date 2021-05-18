// Libraries
import React, { Fragment, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Button, Card, Form, Input, Tag, message, Upload } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { defaultTo, map } from 'lodash'

// Modals
import { ManageUserPassword } from 'modals'

// I18n
import './Profile.i18n'
import 'modals/manageModel/ManageModel.i18n'

// Helpers
import { getRoleColor } from 'helpers/user'

// Styles
import './Profile.less'
const Profile = ({ session }) => {
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false)
  const [form] = Form.useForm()
  const { t } = useTranslation('Profile')

  const user = defaultTo(session?.user, {})

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      message.success()
    })
  }, [])

  return (
    <Fragment>
      <header className='profile-header'>
        <div className='information'>
          <Upload className='avatar' name='avatar' listType='picture'>
            <Avatar size={64} icon={<UserOutlined />} src={user?.image} />
          </Upload>
          <div>
            <h3>{[user?.lastName, user?.firstName].join(' ')}</h3>
            <h4>{user?.email}</h4>
            <div>
              {map(defaultTo(user?.roles, []), (role) => (
                <Tag key={role} color={getRoleColor(role)}>
                  {t(`Common:user.roles.${role}`)}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <Button
          icon={<LockOutlined />}
          type='primary'
          onClick={() => setPasswordModalVisible(true)}
        >
          {t('action.setPassword')}
        </Button>
      </header>
      <Card
        className='profile-main'
        actions={[
          <Button key='update' type='primary' onClick={handleSubmit}>
            {t('action.updateProfile')}
          </Button>
        ]}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='firstName'
            label={t('fields.firstName.title')}
            rules={[
              {
                required: true,
                message: t('ManageModel:form.requiredMessage', {
                  fieldName: t('fields.firstName.title').toLowerCase()
                })
              }
            ]}
          >
            <Input
              placeholder={t('ManageModel:form.input.placeholder', {
                fieldName: t('fields.firstName.title').toLowerCase()
              })}
            />
          </Form.Item>
          <Form.Item
            name='lastName'
            label={t('fields.lastName.title')}
            rules={[
              {
                required: true,
                message: t('ManageModel:form.requiredMessage', {
                  fieldName: t('fields.lastName.title').toLowerCase()
                })
              }
            ]}
          >
            <Input
              placeholder={t('ManageModel:form.input.placeholder', {
                fieldName: t('fields.lastName.title').toLowerCase()
              })}
            />
          </Form.Item>
          <Form.Item
            name='email'
            label={t('fields.email.title')}
            rules={[
              {
                required: true,
                message: t('ManageModel:form.requiredMessage', {
                  fieldName: t('fields.email.title').toLowerCase()
                })
              },
              {
                type: 'email',
                message: t('ManageModel:form.patternMessage.email', {
                  fieldName: t('fields.email.title').toLowerCase()
                })
              }
            ]}
          >
            <Input
              placeholder={t('ManageModel:form.input.placeholder', {
                fieldName: t('fields.email.title').toLowerCase()
              })}
            />
          </Form.Item>
        </Form>
      </Card>
      <ManageUserPassword
        visible={isPasswordModalVisible}
        t={t}
        onCancel={() => setPasswordModalVisible(false)}
      />
    </Fragment>
  )
}

export default Profile
