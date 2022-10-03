<!--
 * @Author: Topskys
 * @Date: 2022-06-13 10:10:51
 * @LastEditTime: 2022-08-30 20:13:23
 * @LastEditors: Topskys
 * @Description: 
-->
<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <!-- <TopBar /> -->
    <NavBar />
    <!-- 路由显示 -->
    <div style="height: 60px;"></div>
    <div class="home-router" :style="{ '--height': `${mainHeight}` }">
      <!-- include - 字符串或正则表达式。只有名称name匹配的组件会被缓存。 -->
      <!-- exclude - 字符串或正则表达式。不保留的缓存，任何名称匹配的组件都不会被缓存。 -->
      <!-- max - 数字。最多可以缓存多少组件实例。 -->
      <transition name="fade" mode="out-in">
        <keep-alive exclude="VMV Search Sheet">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <!-- 底部控制 -->
    <ControlBar v-show="$store.state.showControlBar" />
  </div>
</template>

<script>
// @ is an alias to /src
// 引入home组件
import ControlBar from '@/views/controllerBar/ControlBar.vue'
import TopBar from '@/views/navbar/TopBar.vue'
import { mapState, mapMutations } from 'vuex'
import NavBar from '@/views/navbar/NavBar.vue'
export default {
  name: 'Home',
  components: {
    NavBar,
    ControlBar,
    TopBar,
  },
  computed: {
    ...mapState(['mainHeight']),
  },
}
</script>


<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
  // transform: translate3d(-100%, 100%, 0);
}

.home-router {
  overflow: auto;
  /* 整个滚动条活动范围 */
  height: calc(var(--height));
}


// 滚动条上下箭头
::-webkit-scrollbar-button {
  // background-color: slateblue;
  display: none;
}



/* 整个滚动条 */
::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 10px;
  /* 对应横向滚动条的宽度 */
  height: 10px;
  // background-color:whitesmoke;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: #ddd;
  opacity: .68;
  border-radius: 5px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  // background-color: whitesmoke;//#dbeffd
  border-radius: 5px;
}
</style>
