// 使用localStorage做本地存储
export function setStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
}
export function getStorage(key) {
    return JSON.parse(sessionStorage.getItem(key))
}

export function delStorage(key) {
    sessionStorage.removeItem(key)
}





/**
 * @description: 设置cookies
 * @param {string} key
 * @param {object} value
 * @param {day} expire
 * @return {*}
 */
export const setCookie = (key, value, expire) => {
    const d = new Date //new Function 可省略()
    d.setDate(d.getDate() + expire)
    document.cookie = `${key}=${value};expires=${d.toUTCString}`
}


/**
 * @description: 获取cookies
 * @param {string} key
 * @return {*}
 */
export const getCookie = key => {
    const cookieStr = unescape(document.cookie)
    const arr = cookieStr.split(';')
    let cookieValue = ""
    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i].split('=')
        if (temp[0] === key) {
            cookieValue = temp[1]
            break
        }
    }
    return cookieValue
}


/**
 * @description: 删除cookies
 * @param {string} key
 * @return {*}
 */
export const deleteCookie = key => {
    document.cookie = `${encodeURIComponent(key)}= ;expires = ${new Date()}`
}




/**
 * Ctrl+win+t
 * @description: 防抖
 * @param {*} fn
 * @param {*} delay
 * @return {*}
 */
export const debounce = function (fn, delay) {
    let timer
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}


/**
 * @description: 节流
 * @param {function} fn
 * @param {number} delay
 * @return {*}
 */
export const throttle = function (fn, delay=5000) {
    let last = 0 // 上次触发时间
    return (...args) => {
        const now = Date.now()
        if (now - last > delay) {
            last = now
            fn.apply(this, args)
        }
    }
}



/**
 * 设置求情图片的大小
 * @param {string} url
 * @param {string} size
 * @return {string}
 */
export const imgSize=(url,size) => url && `${url}?param=${size}`