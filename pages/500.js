// Libraries
import React from 'react'

// Components
import { ErrorLayout } from 'components'

const InternalServerError = () => {
  return <ErrorLayout statusCode='500' />
}

export default InternalServerError
