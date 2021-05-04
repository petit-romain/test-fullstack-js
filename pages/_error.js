import Head from 'next/head'
import React, { Fragment } from 'react'
import { Button, Result } from 'antd'
import { useRouter } from 'next/router'
import { defaultTo } from 'lodash'

const ErrorPage = ({ statusCode }) => {
  const router = useRouter()
  return (
    <Fragment>
      <Head>
        <title> Erreur | {`error.page.${statusCode}.title`} </title>
      </Head>
      <Result
        status={statusCode}
        title={statusCode}
        subTitle={`error.page.${statusCode}.description`}
        extra={
          <Button
            type='primary'
            onClick={() =>
              router.push(
                defaultTo(process.env.NEXT_PUBLIC_APP_HOME_PAGE, '/dashboard')
              )
            }
          >
            Retourner à l'accueil
          </Button>
        }
      />
    </Fragment>
  )
}

export const getServerSideProps = ({ res, err }) => {
  return {
    props: {
      statusCode: res ? res?.statusCode : err ? err?.statusCode : 404
    }
  }
}

export default ErrorPage
