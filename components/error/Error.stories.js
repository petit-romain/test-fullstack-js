// Libraries
import React from 'react'

import 'lib/i18n'

// I18n
import 'pages/_app/Common.i18n'

// Components
import ErrorComponent from './'

export const Error = (args) => <ErrorComponent {...args} />

Error.parameters = {
  jest: ['Error.test.js']
}

export default {
  title: 'Components',
  component: ErrorComponent
}
