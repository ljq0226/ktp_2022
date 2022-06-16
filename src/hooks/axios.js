import axios from 'axios'
import { showMessage } from './status'
import { ElMessage } from 'element-plus'

// 设置接口超时时间
axios.defaults.timeout = 50000
// 请求地址-动态赋值环境变量
axios.defaults.baseURL = '/api'
// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 配置请求头
        config.headers = {
            // "Content-Type":'application/x-www-form-urlencoded',//传参方式表单
            'Content-Type': 'application/json;charset=UTF-8', //传参方式json
            'Access-Control-Allow-Origin': '*',
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const { response } = error
        if (response) {
            // 请求已发出但不是在2xx范围
            showMessage(response.status)
            return Promise.reject(response.data)
        } else {
            ElMessage.warning('网络连接异常，请稍后再试！')
        }
    }
)

// 封装GET请求并导出
export function get(url = '', params = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        axios({
            method: type,
            url,
            params,
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

// 封装POST请求并导出
export function post(url = '', params = {}, type = 'POST') {
    return new Promise((resolve, reject) => {
        axios({
            method: type,
            url,
            data: params,
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}
