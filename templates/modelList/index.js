// Libraries
import React, { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { Button, Input, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { defaultTo, isEmpty } from 'lodash'

import { fetcher } from 'lib/swr'

// Styles
import './ModelList.less'

// Components
import { FormLayout, TableLayout } from 'components'

const { Search } = Input

const ModelList = ({ t = () => {}, model = {} }) => {
  /* States */
  const [isManageModalVisible, setManageModalVisible] = useState(false)
  const [modelItem, setModelItem] = useState({})
  const [queryParams, setQueryParams] = useState('')

  /* Model information */
  const modelName = defaultTo(model?.name, '').toLowerCase()
  const isCreating = isEmpty(modelItem)

  /* API information */
  const apiUrl = `/api/${modelName}s`
  const { data, error, mutate } = useSWR([apiUrl, queryParams], fetcher)

  /* Handling API error */
  useEffect(() => {
    error?.response?.status === 400 &&
      message.error(
        [error?.response?.data?.key, error?.response?.data?.message].join(' ')
      )
  }, [error])

  /* Handle model search */
  const searchModel = useCallback((searchText) => {
    if (!isEmpty(searchText)) {
      setQueryParams(`?search=${searchText}`)
    }
  }, [])

  return (
    <div className='model-list-layout'>
      <header className='model-list-layout-headers'>
        {/* Search bar */}
        <Search
          allowClear
          enterButton
          placeholder={t('table.search')}
          onSearch={searchModel}
        />

        {/* Creation button */}
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
      </header>

      <main>
        {/* Table list layout */}
        <TableLayout
          t={t}
          model={model}
          data={data}
          error={error}
          setQueryParams={setQueryParams}
          setModelItem={setModelItem}
          setManageModalVisible={setManageModalVisible}
        />
      </main>

      {/* Manage Modal */}
      <Modal
        className='model-modal-manage'
        visible={isManageModalVisible}
        forceRender
        title={isCreating ? t('modals.create.title') : t('modals.update.title')}
        footer={null}
        onCancel={() => {
          setManageModalVisible(false)
          setModelItem({})
        }}
      >
        <FormLayout t={t} model={model} mutate={mutate} apiUrl={apiUrl} />
      </Modal>
    </div>
  )
}

export default ModelList
