/*
 * @Author: Topskys
 * @Date: 2022-08-30 17:48:39
 * @LastEditTime: 2022-08-30 17:52:22
 * @LastEditors: Topskys
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入模块
import user from '@/store/modules/user'


export default Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        m_user: user,
    }
})