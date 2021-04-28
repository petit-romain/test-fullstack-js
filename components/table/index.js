import {useCallback, useEffect, useState} from 'react'
import {Button, Input, message, Table} from 'antd'
import {defaultTo, isNil, omitBy, some} from 'lodash'
import useSWR from 'swr'

import {fetcher} from 'lib/swr'
import {ManageModel} from 'modals'

import {PlusOutlined} from '@ant-design/icons'
import './Table.less'

const {Search} = Input

const TableLayout = ({model, columns}) => {
    const [isManageModalVisible, setManageModalVisible] = useState(false)
    const [paginationParams, setPaginationParams] = useState(`&offset=0&limit=10`)
    const [filtersParams, setFiltersParams] = useState('')
    const [sorterParam, setSorterParam] = useState('')
    const [modelItem, setModelItem] = useState({})

    const modelName = defaultTo(model?.name, '').toLowerCase()

    const apiUrl = `/api/${modelName}s`
    const {data, error, mutate} = useSWR([apiUrl, '?', paginationParams, sorterParam, filtersParams], fetcher)

    useEffect(() => {
        !isNil(error) && message.error(`${error?.response?.data?.key} ${error?.response?.data?.message}`)
    }, [error])

    const searchModel = useCallback(searchText => {
        message.info(searchText)
    }, [])

    return (
        <div className="table-layout">
            <div className="table-layout-headers">
                <Search
                    allowClear
                    enterButton
                    placeholder={`Rechercher un(e) ${modelName}`}
                    onSearch={searchModel}
                />

                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={() => {
                        setModelItem({})
                        setManageModalVisible(!isManageModalVisible)
                    }}
                >
                    Créer
                </Button>
            </div>

            <div className="table-layout-content">
                <p>
                    {`Nombre de ${modelName} à afficher: ${defaultTo(data?.total, 0)}`}
                </p>
                <Table
                    rowKey="id"
                    loading={isNil(data) && isNil(error)}
                    columns={columns}
                    dataSource={defaultTo(data?.results, [])}
                    pagination={{
                        showSizeChanger: true,
                        total: defaultTo(data?.total, 0),
                        position: ['bottomRight']
                    }}
                    onChange={({current, pageSize, ...props}, filters, sorter) => {
                        const formattedFiltersParams = some(filters, isNil) ? '' : `&filters=${JSON.stringify(omitBy(filters, isNil))}`
                        setFiltersParams(formattedFiltersParams)

                        const formattedSorterParam = isNil(sorter?.column) ? '' : `&sortField=${sorter?.field}&sortOrder=${sorter?.order}`
                        setSorterParam(formattedSorterParam)

                        setPaginationParams(`&offset=${(current - 1) * pageSize}&limit=${pageSize}`)
                    }}
                    onRow={(record, index) => ({
                        onClick: () => {
                            setModelItem(record)
                            setManageModalVisible(true)
                        }
                    })}
                />

            </div>
            <ManageModel
                visible={isManageModalVisible}
                model={model}
                modelItem={modelItem}
                mutate={mutate}
                onVisibleChange={(visible) => setManageModalVisible(visible)}
            />
        </div>
    )
}

export default TableLayout
