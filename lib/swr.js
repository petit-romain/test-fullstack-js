import axios from 'axios'

export const fetcher = (url, ...params) =>
  axios.get(url + params.join('')).then((res) => res?.data)

export const creater = (url, data) =>
  axios.post(url, data).then((res) => res.data)

export const updater = (url, data) =>
  axios.patch(url, data).then((res) => res.data)
