import {useCallback} from 'react'
import {signIn, useSession} from 'next-auth/client'
import {Button, Card, Form, Input, message} from 'antd'
import {defaultTo, isNil} from 'lodash'

import './signin.module.less'

const SignInPage = () => {
    const [form] = Form.useForm()

    const handleOnClick = useCallback(() => {
        form.validateFields()
            .then(({login, password}) => {
                signIn('credentials', {
                    login,
                    password,
                    callbackUrl: 'http://127.0.0.1:3000/dashboard'
                })
                    .then((body) => {
                        if (!isNil(body?.error)) throw new Error(body?.error)
                        message.success('success.login')
                    })
                    .catch(error => {
                        message.error(`api.error.${defaultTo(error?.message, 'default')}`)
                    })
            })
    }, [])

    return <div className='login-page'>
        <div className='description'>
            <h1> Bienvenue sur UBITRACK </h1>
            <h2> Outils de suivi de déchargement de VRAC </h2>
        </div>
        <Card
            actions={[
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleOnClick}
                >
                    Suivant
                </Button>
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    login: "romain.petit@ubidreams.com",
                    password: "azerty1234!"
                }}
            >
                <Form.Item
                    label="Nom d'utilisateur"
                    name="login"
                    rules={[
                        {
                            required: true,
                            message: "Veuillez renseigner un nom d'utilisateur"
                        }
                    ]}
                >
                    <Input placeholder="Nom d'utilisateur"/>
                </Form.Item>
                <Form.Item
                    label="Mot de passe"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Veuillez renseigner un mot de passe"
                        }
                    ]}
                >
                    <Input type="password" placeholder="Mot de passe"/>
                </Form.Item>
            </Form>
        </Card>
    </div>
}

export default SignInPage
