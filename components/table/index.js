// Libraries
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Input, message, Table } from 'antd'
import { defaultTo, isEmpty, isNil } from 'lodash'
import useSWR from 'swr'
import { PlusOutlined } from '@ant-design/icons'

import { fetcher } from 'lib/swr'

// Modals
import { ManageModel } from 'modals'

// Helpers
import { formatColumns } from 'helpers/tableLayout'
import { paginationQueryParams } from 'helpers/swr'

// Styles
import './Table.less'

// Components
const { Search } = Input

const TableLayout = ({ t, model }) => {
  // States
  const [isManageModalVisible, setManageModalVisible] = useState(false)
  const [queryParams, setQueryParams] = useState('')
  const [modelItem, setModelItem] = useState({})
  const [columns, setColumns] = useState([])

  // Model information
  const modelName = defaultTo(model?.name, '').toLowerCase()
  const modelNameTranslated = t('name')

  // API information
  const apiUrl = `/api/${modelName}s`
  const { data, error, mutate } = useSWR([apiUrl, queryParams], fetcher)
  const nbModelItems = defaultTo(data?.total, 0)

  // Table layout information
  useEffect(() => {
    setColumns(formatColumns(model, data, t))
  }, [data, error])

  useEffect(() => {
    !isNil(error) &&
      message.error(
        `${error?.response?.data?.key} ${error?.response?.data?.message}`
      )
  }, [error])

  const searchModel = useCallback((searchText) => {
    if (!isEmpty(searchText)) {
      setQueryParams(`?search=${searchText}`)
    }
  }, [])

  return (
    <div className='table-layout'>
      <div className='table-layout-headers'>
        <Search
          allowClear
          enterButton
          placeholder={t('Common:table.search', {
            modelName: modelNameTranslated.toLowerCase()
          })}
          onSearch={searchModel}
        />

        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => {
            setModelItem({})
            setManageModalVisible(!isManageModalVisible)
          }}
        >
          {t('Common:action.create')}
        </Button>
      </div>

      <div className='table-layout-content'>
        <p>
          {t('Common:table.nbElements', {
            modelName: modelNameTranslated.toLowerCase(),
            nbModelItems
          })}
        </p>
        <Table
          rowKey='id'
          loading={isNil(data) && isNil(error)}
          columns={defaultTo(columns, [])}
          dataSource={defaultTo(data?.results, [])}
          pagination={{
            showSizeChanger: true,
            total: defaultTo(data?.total, 0),
            position: ['bottomRight']
          }}
          onChange={(pagination, filters, sorter) => {
            const formattedQueryParams = paginationQueryParams(
              pagination,
              filters,
              sorter
            )
            setQueryParams(formattedQueryParams)
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
        t={t}
        model={{ ...model, modelName, modelNameTranslated }}
        modelItem={modelItem}
        mutate={mutate}
        url={apiUrl}
        onVisibleChange={(visible) => setManageModalVisible(visible)}
      />
    </div>
  )
}

export default TableLayout
