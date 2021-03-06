import {Fragment} from 'react'
import {Button, Card, Divider, Form, Input, message} from "antd"
import Image from "next/image"

import "../../styles/Signin.module.less"

const Signin = ({socialsAuth = []}) => {
    const [form] = Form.useForm()

    const onFinish = values => {
        console.log({ values })
    }

    return <div className="auth-screen">
        <Card
            bordered={false}
            title={<Fragment>
                <Image
                    src="/vercel.svg"
                    alt={"Logo de l'application"}
                    width={400}
                    height={100}
                />
                <h2> Next JS / Apollo / Prisma </h2>
                <h4><i> Test de nouveaux framework JavaScript </i></h4>
            </Fragment>}
        >
            <div className="auth-email">
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Nom d'utilisateur"
                        name="username"
                        rules={[{required: true, message: "Veuillez renseigner un nom d'utilisateur"}]}
                    >
                        <Input placeholder="Renseignez un nom d'utilisateur"/>
                    </Form.Item>

                    <Form.Item
                        label="Mot de passe"
                        name="password"
                        rules={[{required: true, message: "Veuillez renseigner un mot de passe"}]}
                    >
                        <Input.Password
                            placeholder="Renseignez un mot de passe"
                            onPressEnter={() => form.validateFields()}
                        />
                    </Form.Item>

                    <div className="login-button">
                        <Button type="primary" htmlType="submit">
                            Connexion
                        </Button>
                    </div>
                </Form>
            </div>

            <Divider/>

            <div className="auth-socials">
                {socialsAuth.map(({name, color}) => (
                    <div
                        className="social-logo"
                        onClick={() => message.success(`Connexion par ${name} réussi`)}
                        style={{backgroundColor: color}}
                    >
                        <img src={`/assets/images/${name.toLowerCase()}.png`} alt={name}/>

                    </div>
                ))}
            </div>
        </Card>
    </div>
}

// This gets called on every request
export async function getServerSideProps() {
    const socialsAuth = [
        {
            name: "Google",
            color: "#FF5733"
        },
        {
            name: "Twitter",
            color: "#1DA1F2"
        },
        {
            name: "Facebook",
            color: "#3b5998"
        },
        {
            name: "Linkedin",
            color: "#0e76a8"

        }
    ]

    // Pass data to the page via props
    return {
        props: {socialsAuth}
    }
}


export default Signin