import axios from 'axios'
import { message } from 'antd'

const fetcher = (url, ...params) =>
  axios
    .get(url + params.join(''))
    .then((res) => res?.data)
    .catch((err) => {
      if (err?.response?.status === 401) {
        window.location.href = '/auth/signin'
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
