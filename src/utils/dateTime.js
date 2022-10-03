export function dateTime(value, all = false) {
    var time = new Date(value)
    var y = time.getFullYear()
    var m = (time.getMonth() + 1 + "").toString().padStart(2, '0')
    var d = time.getDate().toString().padStart(2, '0')
    var hh = time.getHours().toString().padStart(2, '0')
    var mm = time.getMinutes().toString().padStart(2, '0')
    var ss = time.getSeconds().toString().padStart(2, '0')
    if (all == true) return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    return `${y}-${m}-${d}`
}


//将毫秒置换成 分钟:秒
export function resetMin(value) {
    var time = new Date(value)
    let min = Math.floor((time / 1000 / 60) << 0)
    let sec = Math.floor((time / 1000) % 60)
    if (sec < 10) sec = "0" + sec
    if (min < 10) min = "0" + min
    return `${min}:${sec}`
}