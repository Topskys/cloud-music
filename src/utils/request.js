import axios from 'axios'
import {
    MessageBox,
    Message,
    Loading
} from 'element-ui'

// create an axios instance
const service = axios.create({
    // baseURL: '/api',
    baseURL: 'http://localhost:3000', // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
})

// service.defaults.withCredentials = true;

// request interceptor
service.interceptors.request.use(
    config => {
        return config
    },
    error => Promise.reject(error)
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service