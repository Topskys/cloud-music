<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <TopBar />
    <!-- 路由显示 -->
    <div style="height: 60px;"></div>
    <div class="home-router" :style="{ '--height': `${mainHeight}`}">
      <!-- include - 字符串或正则表达式。只有名称name匹配的组件会被缓存。 -->
      <!-- exclude - 字符串或正则表达式。不保留的缓存，任何名称匹配的组件都不会被缓存。 -->
      <!-- max - 数字。最多可以缓存多少组件实例。 -->
      <keep-alive exclude="VMV Search Sheet">
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 底部控制 -->
    <ControlBar v-show="$store.state.showControlBar" />
  </div>
</template>

<script>
// @ is an alias to /src
// 引入home组件
import ControlBar from '@/components/home/ControlBar.vue'
import TopBar from '@/components/home/TopBar.vue'
import { mapState, mapMutations} from 'vuex'
export default {
  name: 'Home',
  components: {
    ControlBar,
    TopBar,
  },
  computed:{
    ...mapState(['mainHeight']),
  },
}
</script>


<style lang='scss' scoped>
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
  width: 5px;
  /* 对应横向滚动条的宽度 */
  height: 5px;
  // background-color:whitesmoke;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 2.5px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  // background-color: whitesmoke;//#dbeffd
  border-radius: 2px;
}
</style>
