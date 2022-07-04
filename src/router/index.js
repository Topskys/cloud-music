import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
                    import ('@/views/Mine.vue')
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
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router