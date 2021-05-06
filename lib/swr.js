import axios from 'axios'
import { message } from 'antd'
import { defaultTo } from 'lodash'

const fetcher = (url, ...params) =>
  axios
    .get(url + params.join(''))
    .then((res) => res?.data)
    .catch((err) => {
      if (err?.response?.status === 401) {
        window.location.href = defaultTo(
          process.env.NEXT_PUBLIC_APP_SIGNIN_PAGE,
          '/auth/signin'
        )
      } else {
        return err?.response
      }
    })

const creater = (url, data) =>
  axios
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => {
      if (err?.response?.status === 403) {
        message.error('Permission denied !')
      } else {
        return err.response
      }
    })

export { fetcher, creater }
