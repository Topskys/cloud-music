import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import App from '@/views/NavBar/index.vue'

// 导入样式
import '@/assets/css/index.css'
import '@/assets/css/index.scss'
// 导入并全局注册element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 导入API、utils
import api from '@/api'
import {
    dateTime
} from '@/utils/dateTime.js'
import {
    setStorage,
    getStorage,
    delStorage,
    imgSize,
} from '@/utils/'

// 挂载到原型上
Vue.prototype.$api = api
Vue.prototype.$dateTime = dateTime
Vue.prototype.$setStorage = setStorage
Vue.prototype.$getStorage = getStorage
Vue.prototype.$delStorage = delStorage
Vue.prototype.$imgSize = imgSize
Vue.prototype.c = console.log.bind(document)



//路由跳转后，页面回到顶部，方法一
router.afterEach(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

// import App from '@/components/item/Box.vue'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')