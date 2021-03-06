import Image from "next/image"
import Router from "next/router"
import {Layout} from 'antd'

const {Header} = Layout

import './Header.module.less'

const CustomHeader = () => {
    return <Header>
        <Image
            src="/vercel.svg"
            alt={"Logo de l'application"}
            width={150}
            height={40}
            onClick={() => Router.push('/dashboard')}
        />
    </Header>
}

export default CustomHeader