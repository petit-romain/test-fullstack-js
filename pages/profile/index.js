// Libraries
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'
import { useTranslation } from 'react-i18next'
import { mutate } from 'swr'
import { Avatar, Button, Form, message, Tag, Upload } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { defaultTo, map } from 'lodash'

import { updater } from 'lib/swr'

// Modals
import { ManageUserPassword } from 'modals'

import { serializers } from 'pages/api/users/[[...index]]'

// I18n
import './Profile.i18n'

// Helpers
import { getRoleColor } from 'helpers/user'
import { getModelMetadata } from 'helpers/prisma'

// Styles
import './Profile.less'

// Components
import { FormLayout } from 'components'

const Profile = ({ session, onSessionChange = () => {}, model = {} }) => {
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false)
  const [form] = Form.useForm()
  const { t } = useTranslation('Profile')

  const user = defaultTo(session?.user, {})

  useEffect(() => {
    form.setFieldsValue(user)
  }, [])

  const handleSubmit = useCallback(() => {
    const url = `/api/users/${user?.id}`

    form.validateFields().then(async (formData) => {
      await mutate(url, formData, false)

      mutate(url, updater(url, formData))
        .then(async () => {
          const session = await getSession()
          onSessionChange(session)

          message.success(t('api.success.update'))
        })
        .catch((err) => {
          err?.response?.status === 400 && message.error(t('api.error.update'))
        })
    })
  }, [])

  return (
    <div className='profile-page'>
      <header>
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
      <main>
        <FormLayout t={t} model={model} />
      </main>
      <ManageUserPassword
        visible={isPasswordModalVisible}
        t={t}
        onCancel={() => setPasswordModalVisible(false)}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  const userMetadata = getModelMetadata('User')

  return {
    props: {
      model: { ...userMetadata, serializers }
    }
  }
}

export default Profile
