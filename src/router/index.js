import Vue from 'vue'
import VueRouter from 'vue-router'
import Music from '../views/Music.vue'
import store from '@/store'

// 统一在此做懒加载
const login = () => import('@/views/login/Login.vue')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [{
        path: '/',
        redirect: '/music', // 路由重定向
        name: 'music',
        component: Music,
        children: [{
            path: '/music',
            name: 'music',
            component: () =>
                import('@/views/Music.vue'),
        }]
    },
    {
        path: '/videos',
        name: 'videos',
        component: () =>
            import('@/views/Videos.vue'),
    },
    {
        path: '/mine',
        name: 'mine',
        component: () =>
            import('@/views/Mine.vue'),
        beforeEnter: (to, from, next) => {
            if (to.path === '/mine' && store.state.isLogin) {
                next()
            } else {
                store.state.loginDialogVisible = true
            }
        }
    }, {
        path: '/search',
        name: 'search',
        component: () =>
            import('@/views/Search.vue'),
    }, {
        path: '/sheet',
        name: 'sheet',
        component: () =>
            import('@/views/Sheet.vue'),
    },
    {
        path: '/vmv',
        name: 'vmv',
        component: () =>
            import('@/views/VMV.vue'),
    }, 
    {
        path: '/login',
        name: 'login',
        component: login,
    }

]


const router = new VueRouter({
    mode: 'history',
    //路由跳转后页面回到顶部，方法二
    // scrollBehavior: () => ({
    //     y: 0,
    //     // behavior:'smooth',
    // }), 
    routes
})

// 路由全局守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/vmv') {
        store.state.showControlBar = false
        // 修改mainHeight高度
        store.commit('updateMainHeight', true)
        next()
    } else {
        store.state.showControlBar = true
        // 修改mainHeight高度
        store.commit('updateMainHeight', false)
        next()
    }

})

export default router