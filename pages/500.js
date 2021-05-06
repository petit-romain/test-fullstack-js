import React from 'react'
import Error from 'components/error'

const InternalServerErrorPage = () => {
  return <Error statusCode={500} />
}

export default InternalServerErrorPage
