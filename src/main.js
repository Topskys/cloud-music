import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import App from '@/components/mine/LoginDialog.vue'

// 导入样式
import '@/assets/css/index.css'
// 导入并全局注册element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 导入API、utils
import api from '@/api'
import { dateTime } from '@/utils/dateTime.js'
import { resetSetItem } from '@/utils'

// 挂载到原型上
Vue.prototype.$api = api
Vue.prototype.$resetSetItem = resetSetItem

// import App from '@/components/item/Box.vue'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')