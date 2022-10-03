/*
 * @Author: Topskys
 * @Date: 2022-07-09 09:34:06
 * @LastEditTime: 2022-08-31 13:08:37
 * @LastEditors: Topskys
 * @Description: 
 */
import request from '@/utils/request.js'


// 检查状态，时间轴单词拼写错误，导致请求参数错误
// export const reqCheckStatus = (key) => request({
//     url: `/login/qr/check?=${key}&timerstamp=${Date.now()}`
// })


/**
 * @description: 检测二位扫码状态接口
 * @param {string} key
 * @return {*}
 * timestamp：时间轴，以毫秒为单位的时间
 */
export const reqCheckStatus = (key) => request({
    url: `/login/qr/check`,
    method: 'GET',
    params: {
        key,
        timestamp: new Date().getTime(),
    }
})



/**
 * @description: 检查登录状态接口
 * @return {*}
 */
export const reqLoginStatus = () => request({
    url: `/login/status`,
    method: 'GET',
    params: {
        timestamp: new Date().getTime()
    }
})




/**
 * @description: 获取二维码key接口
 * @return {*}
 */
export const reqQRKey = () => request({
    url: `/login/qr/key`,
    method: 'GET',
    params: {
        timestamp: new Date().getTime()
    }
})



/**
 * @description: 二维码生成接口
 * @param {string} key
 * @return {*}
 * qrimg：传入后会返回一个base64编码的登录二维码
 */
export const reqQRImg = (key) => request({
    url: `/login/qr/create`,
    method: 'GET',
    params: {
        key,
        qrimg: true,
        timestamp: new Date().getTime()
    }
})



/**
 * 刷新登录
 * 说明 : 调用此接口 , 可刷新登录状态
 * - 调用例子 : /login/refresh
 */
export const refreshCookie = () => request({
    url: '/login/refresh',
    method: 'post',
});


/**
 * 退出登录
 * 说明 : 调用此接口 , 可退出登录
 */
export const logout = () => request({
    url: '/logout',
    method: 'post',
});