import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
    // 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [{
        path: '/',
        redirect: '/music', // 路由重定向
        name: 'home',
        component: Home,
        children: [{
                path: '/music',
                name: 'music',
                component: () =>
                    import ('@/views/Music.vue'),
            }, {
                path: '/videos',
                name: 'videos',
                component: () =>
                    import ('@/views/Videos.vue')
            }, {
                path: '/mine',
                name: 'mine',
                component: () =>
                    import ('@/views/Mine.vue'),
                beforeEnter: (to, from, next) => {
                    if (store.state.isLogin) {
                        next()
                    } else {
                        store.state.loginDialogVisible = true
                    }
                }
            }, {
                path: '/search',
                name: 'search',
                component: () =>
                    import ('@/views/Search.vue'),
            }, {
                path: '/sheet',
                name: 'sheet',
                component: () =>
                    import ('@/views/Sheet.vue'),
            },
            {
                path: '/vmv',
                name: 'vmv',
                component: () =>
                    import ('@/views/VMV.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/components/mine/LoginDialog.vue'),
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 路由全局守卫
router.beforeEach((to,from,next) =>{
    if(to.path === '/vmv'){
        store.state.showControlBar= false
        // 修改mainHeight高度
        store.commit('updateMainHeight',true)
        next()
    }else{
        store.state.showControlBar= true
        // 修改mainHeight高度
        store.commit('updateMainHeight',false)
        next()
    }
    
})

export default router