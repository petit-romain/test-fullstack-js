import axios from 'axios'
import { message } from 'antd'
import { defaultTo } from 'lodash'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const signInPage = defaultTo(
      process.env.NEXT_PUBLIC_APP_SIGNIN_PAGE,
      '/auth/signin'
    )

    switch (error?.response?.status) {
      case 401:
        window.location.pathname = signInPage
        break
      case 403:
        message.error('PERMISSION DENIED')
        break
      case 404:
        message.warn('NOT FOUND')
        break
      case 500:
        throw new Error(error?.response)
      default:
        return Promise.reject(error)
    }
  }
)

export const fetcher = (url, ...params) =>
  axios.get(url + params.join('')).then((res) => res?.data)

export const creater = (url, data) =>
  axios.post(url, data).then((res) => res.data)

export const updater = (url, data) =>
  axios.patch(url, data).then((res) => res.data)
