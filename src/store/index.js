/*
 * @Author: Topskys
 * @Date: 2022-06-13 10:10:51
 * @LastEditTime: 2022-09-01 22:23:16
 * @LastEditors: Topskys
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import user from '@/store/modules/user.js'



export default new Vuex.Store({
    state: {
        // 播放
        isLogin: false, // 是否登录
        // 登录对话框
        loginDialogVisible: false,
        // 是否播放
        isPlay: false,
        // 播放列表，存歌曲id// 当前播放的歌单
        playlist: [],
        // 播放下标，用于上下曲切换
        playlistIndex: -1,
        // 自动播放
        isAutoPlay: false,
        // 播放总时长
        duration: 0,
        // 控制底部播放控制栏的显隐
        showControlBar: true,
        //中间路由高度 home.vue之.home-router
        mainHeight: '100vh\t-\t60px\t-\t66px',
        // 详细播放
        detailPlay: true,
        // 显示播放卡片
        showPlayCard: false,
    },
    getters: {},
    mutations: {

        // 修改播放状态
        changePlay(state, isPlay) {
            state.isPlay = isPlay
        },
        // 更新播放列表
        updatePlaylist(state, playlist) {
            state.playlist = []
            state.playlist = playlist
            console.log("state.playlist", state.playlist)
        },
        pushPlaylist(state, id) {
            state.playlist.push(id)
        },
        changePlaylistIndex(state, index) {
            state.playlistIndex = index
        },
        // 自动播放
        changeAutoPlay(state, autoPlay) {
            state.isAutoPlay = autoPlay
        },
        // 修改时长
        updateDuration(state, duration) {
            state.duration = duration
        },
        // 更新登录状态
        updateLogin: function (state, isLogin) {
            state.isLogin = isLogin;
        },
        // 改变显示当前播放详情页的显示与隐藏
        changeShowPlayDetailPage(state, isShowPlayDetailPage) {
            state.isShowPlayDetailPage = !isShowPlayDetailPage
        },
        // 修改底部播放音乐控件的显隐
        updateShowControlBar(state, boolean) {
            state.showControlBar = boolean
        },
        // 更新中间路由高度
        // document.body.clientHeight() // 获取body高度
        // document.getElementById("yy").offsetHeight// 获取元素高度
        updateMainHeight(state, boolean) {
            state.mainHeight = boolean ? '100vh\t-\t60px' : '100vh\t-\t60px\t-\t66px' // 三元运算
        },
        // 修改详情播放
        updateDetailPlay(state, boolean) {
            state.detailPlay = boolean
        },
        updateShowPlayCard(state, boolean) {
            state.showPlayCard = boolean
        }
    },
    actions: {},
    modules: {
        m_user: user,

    }
})