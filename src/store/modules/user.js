/*
 * @Author: Topskys
 * @Date: 2022-08-30 16:52:34
 * @LastEditTime: 2022-08-30 18:37:43
 * @LastEditors: Topskys
 * @Description: 
 */
import {
    setStorage,
    getStorage
} from '@/utils'

export default {
    namespaced: true,

    // state: () => ({
    //     userInfo: getStorage('userInfo') || {},
    // }),

    state: {
        userInfo: getStorage('userInfo') || {},
    },
    // 全局响应式数据在此取
    getters: {
        userInfo: (state) => state.userInfo
    },
    mutations: {
        updateUserInfo: function (state, info) {
            state.userInfo = info
            this.commit("m_user/setUserInfoToStorage")
        },
        setUserInfoToStorage(state) {
            setStorage("userInfo", state.userInfo)
        }
    }
}