<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <TopBar />
    <!-- 路由显示 -->
    <div style="height: 60px;"></div>
    <div class="home-router">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 底部控制 -->
    <ControlBar />
  </div>
</template>

<script>
// @ is an alias to /src
// 引入home组件
import ControlBar from '@/components/home/ControlBar.vue'
import TopBar from '@/components/home/TopBar.vue'

export default {
  name: 'Home',
  components: {
    ControlBar,
    TopBar,
  }
}
</script>


<style lang='scss' scoped>
.home-router {
  overflow: auto;
  /* 整个滚动条活动范围 */
  height: calc(100vh - 60px - 66px );  
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
