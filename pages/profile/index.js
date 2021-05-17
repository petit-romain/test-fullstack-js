// Libraries
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Button, Card, Form, Input, Tag } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { defaultTo, map } from 'lodash'

// I18n
import './Profile.i18n'

// Styles
import './Profile.less'

const Profile = ({ session }) => {
  const [form] = Form.useForm()
  const { t } = useTranslation('Profile')

  const user = defaultTo(session?.user, {})

  return (
    <Fragment>
      <header className='profile-header'>
        <div className='information'>
          <Avatar size={64} icon={<UserOutlined />} src={user?.image} />
          <div>
            <h3>{[user?.lastName, user?.firstName].join(' ')}</h3>
            <h4>{user?.email}</h4>
            <div>
              {map(defaultTo(user?.roles, []), (role) => (
                <Tag key={role}>{t(`Common:user.roles.${role}`)}</Tag>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Button icon={<LockOutlined />} type='primary'>
            Modifier mon mot de passe
          </Button>
        </div>
      </header>
      <main>
        <Card
          actions={[
            <Button key='update' type='primary'>
              {t('Common:action.update')}
            </Button>
          ]}
        >
          <Form form={form} layout='vertical'>
            <Form.Item name='image' label='Avatar'>
              UPLOAD
            </Form.Item>
            <Form.Item name='firstName' label='Prénom'>
              <Input />
            </Form.Item>
            <Form.Item name='lastName' label='Nom'>
              <Input />
            </Form.Item>
          </Form>
        </Card>
      </main>
    </Fragment>
  )
}

export default Profile
