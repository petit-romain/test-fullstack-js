// Libraries
import Head from 'next/head'
import React, { Fragment } from 'react'
import { Button, Result } from 'antd'
import { useRouter } from 'next/router'
import { defaultTo } from 'lodash'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// Configs
import i18nConfig from 'configs/i18n.config'

const ErrorPage = ({ t, statusCode }) => {
  const router = useRouter()

  return (
    <Fragment>
      <Head>
        <title> {t(`error.page.${statusCode}.title`)} </title>
      </Head>
      <Result
        status={statusCode}
        title={statusCode}
        subTitle={t(`error.page.${statusCode}.description`)}
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

export const getServerSideProps = async ({ res, err, locale }) => {
  const translations = await serverSideTranslations(
    locale,
    ['Common'],
    i18nConfig
  )

  return {
    props: {
      statusCode: res ? res?.statusCode : err ? err?.statusCode : 404,
      ...translations
    }
  }
}

export default ErrorPage
