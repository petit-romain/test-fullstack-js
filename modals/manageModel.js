// Librairies
import {useCallback, useEffect} from 'react'
import {Form, Input, message, Modal, Select} from 'antd'
import {defaultTo, filter, includes, map} from 'lodash'

import {creater} from '../lib/swr'

// Components
const {Option} = Select

const ManageModel = ({visible, model, modelItem, mutate, onVisibleChange}) => {
    const [form] = Form.useForm()

    const modelFields = filter(defaultTo(model?.fields, []), ({name}) => (
        !includes(['id', ...defaultTo(model?.blackListFields, [])], name)
    ))
    const modelName = defaultTo(model?.name, '').toLowerCase()
    const apiModelUrl = `/api/${modelName}s`

    useEffect(() => {
        form.setFieldsValue(modelItem)
    }, [modelItem])

    const renderField = useCallback(({fieldName, choices, isList, ...field}) => {
        switch (field?.kind) {
            case 'enum':
                return <Select
                    allowClear
                    mode={isList ? 'multiple' : 'single'}
                    placeholder={`Sélectionner un ${fieldName}`}
                >
                    {map(choices, choice => (
                            <Option key={choice}>
                                {choice}
                            </Option>
                        )
                    )}
                </Select>
            case 'scalar':
                return <Input
                    placeholder={`Renseignez un ${fieldName}`}
                />
            default:
                return <Input/>
        }
    }, [])

    const createModel = useCallback(async formData => {
        mutate(apiModelUrl, formData, false)

        creater(apiModelUrl, formData)
            .then(() => message.success())
            .catch(() => message.error())
        // console.log(test)

        mutate(apiModelUrl)
            /* .then((...props) => {
                console.log(props)
                // onVisibleChange(false)
                // form.resetFields()
                message.success(`SUCCESS -> ${modelName}`)
            })
            .catch(() => message.error(`ERROR -> ${modelName}`)) */
    }, [])

    return (
        <Modal
            visible={visible}
            forceRender
            title={`Créer un(e) ${modelName}`}

            okText="Créer"
            onOk={() => {
                form.validateFields()
                    .then(formData => {
                        createModel(formData)
                    })
            }}

            cancelText="Annuler"
            onCancel={() => {
                form.resetFields()
                onVisibleChange(false)
            }}
        >
            <Form
                form={form}
                layout="vertical"
            >
                {map(modelFields, ({kind, type, choices, isRequired, ...field}, index) => {
                    const fieldName = defaultTo(field?.name, '')

                    let rules = [
                        {
                            required: isRequired,
                            message: `Veuillez renseigner un ${fieldName}`
                        },

                    ]

                    if (includes(fieldName, 'mail') && type === 'String') {
                        rules = [...rules, {
                            type: 'email',
                            message: `Le champs ${fieldName} doit être une adresse mail`
                        }]
                    }

                    return <Form.Item
                        key={index}
                        name={fieldName}
                        label={fieldName}
                        rules={rules}
                    >
                        {renderField({
                            ...field,
                            kind,
                            fieldName,
                            isRequired,
                            choices
                        })}
                    </Form.Item>
                })}
            < /Form>

        </Modal>
    )
}

ManageModel.defaultProps = {
    visible: false,
    model: {},
    modelItem: {},
    mutate: () => {
    },
    onVisibleChange: () => {
    },
}

export default ManageModel
