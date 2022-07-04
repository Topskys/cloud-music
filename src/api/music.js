import request from '@/utils/request.js'


// 获取Banner图片
export const reqBanner = (type = 0) => request({ url: `/banner?type=${type}`, method: 'GET' })


// 获取推荐歌单
export const reqRecommend = (limit = 10) => request({ url: `/top/playlist?limit=${limit}`, method: 'GET' })


// 获取歌单详情
export const reqSheetDetail = (id) => request({ url: `/playlist/detail?id=${id}`, method: 'GET' })


// 获取歌单所有歌曲
export const reqSheetSongs = (id, limit, offset = 0) => request({ url: `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`, method: 'GET' })


// 获取歌曲URL
export const reqSongURL = (id) => request({ url: `/song/url?id=${id}`, method: 'GET' })



// 获取歌曲详情
export const reqSongDetails = (ids) => request({ url: `/song/detail?ids=${ids}`, method: 'GET' })



// 搜索
export const reqSearch = (keywords, type = 1, limit = 10, offset = 0) => request({ url: `/search?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`, method: 'GET' })