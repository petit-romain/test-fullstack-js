// Libraries
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { defaultTo, isNil } from 'lodash'

// Helpers
import { formatColumns } from 'helpers/tableLayout'
import { formatQueryParams } from 'helpers/swr'

// Styles
import './Table.less'

const TableLayout = ({
  t,
  model = {},
  data = {},
  error = {},
  setQueryParams = () => {},
  setModelItem = () => {},
  setManageModalVisible = () => {}
}) => {
  const [columns, setColumns] = useState([])

  /* Table layout information */
  useEffect(() => {
    setColumns(formatColumns(model, data, t))
  }, [data])

  /* API Information */
  const nbModelItems = defaultTo(data?.total, 0)

  return (
    <div className='table-layout'>
      <p>{t('table.nbElement', { count: nbModelItems })}</p>
      <Table
        rowKey='id'
        loading={isNil(data) && isNil(error)}
        columns={defaultTo(columns, [])}
        dataSource={defaultTo(data?.results, [])}
        pagination={{
          showSizeChanger: true,
          total: nbModelItems,
          position: ['bottomRight']
        }}
        onChange={(pagination, filters, sorter) => {
          const formattedQueryParams = formatQueryParams(
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
  )
}

export default TableLayout
