// Libraries
import Head from 'next/head'
import React, { Fragment } from 'react'
import { Button, Result } from 'antd'
import { useRouter } from 'next/router'
import { defaultTo } from 'lodash'

const ErrorPage = ({ t, statusCode }) => {
  const router = useRouter()

  return (
    <Fragment>
      <Head>
        <title> {t(`page.${statusCode}.title`)} </title>
      </Head>
      <Result
        status={statusCode}
        title={statusCode}
        subTitle={t(`page.${statusCode}.description`)}
        extra={
          <Button
            type='primary'
            onClick={() =>
              router.push(
                defaultTo(process.env.NEXT_PUBLIC_APP_HOME_PAGE, '/dashboard')
              )
            }
          >
            {t('action.backHome')}
          </Button>
        }
      />
    </Fragment>
  )
}

export default ErrorPage
