import axios from 'axios'

const fetcher = (url, ...params) => (
    axios.get(url + params.join(''))
        .then(res => {
            console.log(res)
            return res.data
        })
)

const creater = (url, data) => (
    axios.post(url, data)
        .then(res => res.data)
        .catch(err => {
            return err.response
        })
)

const updater = url => {
    axios.put(url)
        .then(res => res.data)
        .catch(error => {
            throw new Error(error)
        })
}

export {
    fetcher,
    creater,
    updater
}
