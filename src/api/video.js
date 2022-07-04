import request from '@/utils/request.js'


// 获取视频详情
export const reqVideoDetail = (id) => request({ url: `/video/detail?id=${id}`, method: 'GET' })



// 获取视频播放地址
export const reqVideoURL = (id) => request({ url: `/video/url?id=${id}`, method: 'GET' })



// 获取相关视频
export const reqSimilarVideo = (id) => request({ url: `/related/allvideo?id=${id}`, method: 'GET' })