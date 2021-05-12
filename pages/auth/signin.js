// Libraries
import React, { useCallback } from 'react'
import { signIn } from 'next-auth/client'
import { Button, Card, Form, Input, message } from 'antd'
import { defaultTo, isNil } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// Configs
import i18nConfig from 'configs/i18n.config'

import './signin.module.less'

const SignInPage = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const { t } = useTranslation('SignIn')

  const { t } = useTranslation('SignIn')

  const handleOnClick = useCallback(() => {
    form.validateFields().then(({ login, password }) => {
      signIn('credentials', {
        login,
        password,
        redirect: false
      })
        .then((body) => {
          if (!isNil(body?.error)) throw new Error(body?.error)
          router.push(
            defaultTo(process.env.NEXT_PUBLIC_APP_HOME_PAGE, '/dashboard')
          )
          message.success(t('api.success.login'))
        })
        .catch((error) => {
          message.error(t(`api.error.${defaultTo(error?.message, 'default')}`))
        })
    })
  }, [])

  return (
    <div className='login-page'>
      <div className='description'>
        <h1>
          {t('Common:app.welcome', {
            appName: process.env.NEXT_PUBLIC_APP_NAME
          })}
        </h1>
        <h2> {process.env.NEXT_PUBLIC_APP_DESCRIPTION} </h2>
      </div>
      <Card
        actions={[
          <Button
            key='next'
            type='primary'
            htmlType='submit'
            onClick={handleOnClick}
          >
            {t('Common:action.next')}
          </Button>
        ]}
      >
        <Form
          form={form}
          layout='vertical'
          initialValues={{
            login: 'alice@prisma.io',
            password: 'azerty1234!'
          }}
        >
          <Form.Item
            label={t('fields.login.title')}
            name='login'
            rules={[
              {
                required: true,
                message: t('fields.login.requiredMessage')
              }
            ]}
          >
            <Input placeholder={t('fields.login.placeholder')} />
          </Form.Item>
          <Form.Item
            label={t('fields.password.title')}
            name='password'
            rules={[
              {
                required: true,
                message: t('fields.password.requiredMessage')
              }
            ]}
          >
            <Input
              type='password'
              placeholder={t('fields.password.placeholder')}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export const getServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(
    locale,
    ['SignIn', 'Common'],
    i18nConfig
  )

  return {
    props: translations
  }
}

export default SignInPage
