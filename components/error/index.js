// Libraries
import React, { Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Button, Result } from 'antd'
import { defaultTo } from 'lodash'

// I18n
import './Error.i18n'

const ErrorLayout = ({ statusCode = '404' }) => {
  const router = useRouter()

  const { t } = useTranslation('Error')

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
            {t('Common:action.backHome')}
          </Button>
        }
      />
    </Fragment>
  )
}

ErrorLayout.propTypes = {
  /**
   * Error status code
   */
  statusCode: PropTypes.oneOf(['404', '500'])
}

export default ErrorLayout
