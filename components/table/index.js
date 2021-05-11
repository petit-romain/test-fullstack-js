// Libraries
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Input, message, Table } from 'antd'
import { defaultTo, find, includes, isEmpty, isNil, map } from 'lodash'
import useSWR from 'swr'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'next-i18next'

import { fetcher } from 'lib/swr'

// Modals
import { ManageModel } from 'modals'

// Helpers
import { sorter, filter } from 'helpers/tableLayout'
import { paginationQueryParams } from 'helpers/swr'

// Styles
import './Table.less'

// Components
const { Search } = Input

const TableLayout = ({ model, columns }) => {
  const [isManageModalVisible, setManageModalVisible] = useState(false)
  const [queryParams, setQueryParams] = useState('')
  const [modelItem, setModelItem] = useState({})

  // I18n
  const { t } = useTranslation('Common')

  const modelName = defaultTo(model?.name, '').toLowerCase()

  const apiUrl = `/api/${modelName}s`
  const { data, error, mutate } = useSWR([apiUrl, queryParams], fetcher)

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

  const sortedColumns = map(columns, (column) => {
    const field = find(model?.fields, ['name', column?.key])

    const isFieldSortable = includes(['String', 'Integer'], field?.type)
    const isFieldFilterable = !isEmpty(field?.choices) && field?.kind === 'enum'

    return {
      ...column,
      sorter: isFieldSortable ? (a, b) => sorter(a, b, field) : null,
      filters: isFieldFilterable ? filter(field) : null
    }
  })

  return (
    <div className='table-layout'>
      <div className='table-layout-headers'>
        <Search
          allowClear
          enterButton
          placeholder={`Rechercher un(e) ${modelName}`}
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
          {t(['Common:create', 'Create'])}
        </Button>
      </div>

      <div className='table-layout-content'>
        <p>
          {`Nombre de ${modelName} à afficher: ${defaultTo(data?.total, 0)}`}
        </p>
        <Table
          rowKey='id'
          loading={isNil(data) && isNil(error)}
          columns={sortedColumns}
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
        model={{ ...model, modelName }}
        modelItem={modelItem}
        mutate={mutate}
        url={apiUrl}
        onVisibleChange={(visible) => setManageModalVisible(visible)}
      />
    </div>
  )
}

export default TableLayout
