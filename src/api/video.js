import request from '@/utils/request.js'


// 获取视频详情
export const reqVideoDetail = (id) => request({ url: `/video/detail?id=${id}`, method: 'GET' })



// 获取视频播放地址
export const reqVideoURL = (id) => request({ url: `/video/url?id=${id}`, method: 'GET' })



// 获取相关视频
export const reqSimilarVideo = (id) => request({ url: `/related/allvideo?id=${id}`, method: 'GET' })


// 获取mv详情
export const reqMVDetail = (mvid) => request({ url: `/mv/detail?mvid=${mvid}`, method: 'GET' })


// 获取mv播放地址
export const reqMVURL = (id,r=1080) => request({ url: `/mv/url?id=${id}&r=${r}`, method: 'GET' })


// 获取推荐视频
export const reqVideoRecommend = (offset=0) => request({ url: `/video/timeline/recommend?offset=${offset}`, method: 'GET' })




