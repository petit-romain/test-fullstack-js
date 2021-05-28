// Libraries
import React from 'react'

import 'lib/i18n'

// I18n
import 'pages/_app/Common.i18n'

// Components
import TableComponent from './'

export const Table = (args) => <TableComponent {...args} />

Table.args = {
  data: {
    total: 1,
    results: [
      {
        title: 'test'
      }
    ]
  }
}

export default {
  title: 'Components/Table',
  component: TableComponent
}
