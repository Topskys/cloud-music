import request from '@/utils/request.js'


// 检查状态
export const reqCheckStatus = (key) => request({ url: `/login/qr/check?=${key}&timerstamp=${Date.now()}`, method: 'GET' })



// 检查登录状态
export const reqLoginStatus = () => request({ url: `/login/status?timerstamp=${Date.now()}`, method: 'GET' })




// 获取二维码key
export const reqQRKey = () => request({ url: `/login/qr/key?timerstamp=${Date.now()}`, method: 'GET' })




// 获取二维码
export const reqQRImg = (key) => request({ url: `/login/qr/create?=${key}&qrimg=true&timerstamp=${Date.now()}`, method: 'GET' })