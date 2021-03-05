import {Fragment} from 'react'
import {Button, Card, Input, message} from 'antd'

import '../../styles/Signin.module.less'

const Signin = ({providers}) => {

    return <Fragment>
        <Card
            title="Page de connexion"
            className="container"
            actions={[
                <Button>
                    Retour
                </Button>,
                <Button
                    type='primary'
                    onClick={() => message.success('Connexion réussie')}
                >
                    Connexion
                </Button>
            ]}
        >
            <Input placeholder="Nom d'utilisateur" />
            <Input.Password placeholder="Mot de passe" />
        </Card>
    </Fragment>
}

// This gets called on every request
export async function getServerSideProps() {

    // Pass data to the page via props
    return {
        props: {

        }
    }
}


export default Signin