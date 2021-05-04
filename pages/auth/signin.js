import React, { useCallback } from 'react'
import { signIn } from 'next-auth/client'
import { Button, Card, Form, Input, message } from 'antd'
import { defaultTo, isNil } from 'lodash'

import './signin.module.less'
import { useRouter } from 'next/router'

const SignInPage = () => {
  const router = useRouter()
  const [form] = Form.useForm()

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
          message.success('success.login')
        })
        .catch((error) => {
          message.error(`api.error.${defaultTo(error?.message, 'default')}`)
        })
    })
  }, [])

  return (
    <div className='login-page'>
      <div className='description'>
        <h1> {`Bienvenue sur ${process.env.NEXT_PUBLIC_APP_NAME}`} </h1>
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
            Suivant
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
            label="Nom d'utilisateur"
            name='login'
            rules={[
              {
                required: true,
                message: "Veuillez renseigner un nom d'utilisateur"
              }
            ]}
          >
            <Input placeholder="Nom d'utilisateur" />
          </Form.Item>
          <Form.Item
            label='Mot de passe'
            name='password'
            rules={[
              {
                required: true,
                message: 'Veuillez renseigner un mot de passe'
              }
            ]}
          >
            <Input type='password' placeholder='Mot de passe' />
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default SignInPage
