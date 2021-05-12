// Libraries
import React from 'react'

// Components
import Error from 'components/error'

const InternalServerErrorPage = () => {
  return <Error statusCode={500} />
}

export default InternalServerErrorPage
