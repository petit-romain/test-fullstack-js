// Libraries
import React from 'react'

// Components
import Error from 'components/error'

const InternalServerError = () => {
  return <Error statusCode={500} />
}

export default InternalServerError
