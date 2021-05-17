// Libraries
import Head from 'next/head'
import React, { Fragment } from 'react'
import { Button, Result } from 'antd'
import { useRouter } from 'next/router'
import { defaultTo } from 'lodash'
import { useTranslation } from 'react-i18next'

// I18n
import './Error.i18n'

const ErrorPage = ({ statusCode }) => {
  const router = useRouter()

  const { t } = useTranslation('Common')

  return (
    <Fragment>
      <Head>
        <title> {t(`${statusCode}.title`)} </title>
      </Head>
      <Result
        status={statusCode}
        title={statusCode}
        subTitle={t(`${statusCode}.description`)}
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
