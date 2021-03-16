import {useEffect, useState} from 'react'
import {Button, Form, Input, message, Modal, Table} from "antd"
import {PlusOutlined, SyncOutlined} from "@ant-design/icons"
import {defaultTo, get} from "lodash"
import axios from "axios"

const Users = () => {
    const [form] = Form.useForm()

    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isCreating, setCreating] = useState(false)
    const [isResetting, setResetting] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            sorter: true,
            showSorterTooltip: false
        },
        {
            title: "First name",
            dataIndex: "firstName",
            key: "firstName",
            sorter: true,
            showSorterTooltip: false
        },
        {
            title: "Last name",
            dataIndex: "lastName",
            key: "lastName",
            sorter: true,
            showSorterTooltip: false
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: true,
            showSorterTooltip: false
        },
        {
            title: "Action",
            render: (action, user) => (
                <Button
                    icon={<SyncOutlined />}
                    type="danger"
                    loading={isResetting}
                    onClick={() => resetUser(user)}
                >
                    Reset
                </Button>
            )
        }
    ]

    const fetchUsers = () => {
        setLoading(true)
        axios.get('/api/users?select=id,lastName,firstName,email')
            .then(body => {
                setUsers(defaultTo(get(body, 'data'), []))
            })
            .catch(() => (
                message.error("An error occurred on user creation")
            ))
            .finally(() => {
                setLoading(false)
            })
    }

    const createUser = user => {
        setCreating(true)
        axios.post('/api/users', user)
            .then(() => {
                form.resetFields()
                setModalVisible(false)
                message.success("User created with success")
                fetchUsers()
            })
            .catch(() => message.error("An error occurred on user creation"))
            .finally(() => {
                setCreating(false)
            })
    }

    const resetUser = user => {
        setResetting(true)
        console.log(user)
        axios.patch('/api/users/reset', user)
            .then(() => {
                message.success("User reset with success")
                fetchUsers()
            })
            .catch(() => message.error("An error occurred on user reset"))
            .finally(() => {
                setResetting(false)
            })
    }

    return <div>
        <h1>{`Users page (${defaultTo(get(users, 'length'), 0)})`}</h1>
        <Button
            icon={<PlusOutlined/>}
            type="primary"
            onClick={() => setModalVisible(true)}
        >
            Create
        </Button>
        <Table
            rowKey="id"
            loading={isLoading}
            columns={columns}
            pagination={{position: "bottomRight"}}
            onChange={(pagination, filters, sorter) => {
                console.warn({
                    pagination, filters, sorter
                })
            }}
            dataSource={users}
        />
        <Modal
            visible={isModalVisible}
            title="User creation"
            okText="Create"
            okButtonProps={{
                loading: isCreating,
                onClick: () => form.validateFields()
                    .then(formValues => createUser(formValues))
            }}
            onCancel={() => {
                form.resetFields()
                setModalVisible(false)
            }}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your lastname"
                        }
                    ]}
                >
                    <Input placeholder="Insert a lastname"/>
                </Form.Item>

                <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your firstname"
                        }
                    ]}
                >
                    <Input placeholder="Insert a firstname"/>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}

export default Users