import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        // 播放
        isLogin: false, // 是否登录
        isPlay: false, // 是否播放
        playlist: [{
            id: 18057481, // 歌曲id
            name: "In A Notebook ", // 歌曲名称
            ar: [{ //歌手
                id: 57968,
                name: "Goldmund",
            }],
            al: { // 专辑
                id: 1660117,
                name: "The Malady Of Elegance",
                picUrl: "https://p2.music.126.net/vwTBDbUbHmDRrAYg6gxxfQ==/109951163439384227.jpg",
            },

            mv: 0,

        }], // 当前播放的歌单
        playlistIndex: 0, // 播放下标，用于上下曲切换
        isAutoPlay: false, // 自动播放
        duration: 0, // 时长
        currentTime: 0, //当前播放时间


        currSheetId: '', // 当前播放歌单的id
        currIndex: -1, // 当前播放音乐的索引
        currTime: 0, // 实时播放时长
        isShowPlayDetailPage: false, // 是否显示播放音乐的详情页
        isMusicLoad: false, // 音乐是否在加载中
        currRowInfo: {}, // 在歌手详情保存的上一首歌曲信息


        // 收藏列表
        likeMusicList: [], // 用户喜欢的音乐列表
        // 已收藏的歌单
        // 已收藏的专辑
        subAlbumList: null,
        subSingerList: null, // 已收藏的歌手
        subVideoList: null, // 已收藏的video
        collectMusicList: [], // 已收藏的歌单
        createdMusicList: [], // 用户创建的歌单
        likeVideoList: null, // 已喜欢的视频
        // 要下载的音乐信息
        // downloadMusicInfo: {
        //     name: '',
        //     url: '',
        // },

    },
    getters: {},
    mutations: {

        // 修改播放状态
        changePlay(state, isPlay) {
            state.isPlay = isPlay
        },
        // 更新播放列表
        updatePlaylist(state, playlist) {
            state.playlist = playlist
            console.log("state.playlist", state.playlist)
        },
        changePlaylistIndex(state, index) {
            state.playlistIndex = index
        },
        // 自动播放
        changeAutoPlay(state, autoPlay) {
            state.isAutoPlay = autoPlay
        },
        // 修改时长
        changeDuration(state, duration) {
            state.duration = duration
        },
        changeCurrentTime(state, currentTime) {
            state.currentTime = currentTime
        },
        // 更新登录状态
        updateLogin(state, isLogin) {
            state.isLogin = isLogin;
        },
        // 改变显示当前播放详情页的显示与隐藏
        changeShowPlayDetailPage(state, isShowPlayDetailPage) {
            state.isShowPlayDetailPage = !isShowPlayDetailPage
        },
        // 更新播放时长
        updateCurrTime(state, currTime) {
            state.currTime = currTime;
        },
    },
    actions: {},
    modules: {}
})