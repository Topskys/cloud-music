<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <NavBar />
    <!-- 路由显示 -->
    <main>
      <transition name="fade" mode="out-in">
        <!-- <keep-alive exclude="VMV Search Sheet Login"> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </transition>
    </main>
    <!-- 底部控制 -->
    <ControlBar v-show="$store.state.showControlBar"
      :class="$store.state.showControlBar ? 'shutter-in-bottom' : 'shutter-out-bottom'" />
      <ToTop scrollObj="main"></ToTop>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/views/navbar/NavBar.vue'
import ControlBar from '@/views/controlBar/ControlBar.vue'
import ToTop from '@/components/bar/ToTop.vue'
export default {
  name: 'Home',
  components: {
    NavBar,
    ControlBar,
    ToTop,
  },
  computed: {
    ...mapState(['mainHeight']),
  },
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000; // #2c3e50
  /* 最小宽度和最小高度 */
  min-width: 960px;
  min-height: 100vh;

  main {
    height: 100vh;
    overflow: auto;
    padding: 64px 10vw 86px 10vw; // padding: 64px 10vw 66px 10vw;
    // scrollbar-width: none;
  }

  @media screen and (max-width:1336px) {
    main {
      padding: 64px 5vw 86px 5vw;
    }
  }
}



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



// // 滚动条上下箭头
::-webkit-scrollbar-button {
  display: none;
}



/* 整个滚动条 */
::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 8px;
  /* 对应横向滚动条的宽度 */
  height: 8px;
}

// main::-webkit-scrollbar {
//   width: 0;
// }

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: hsla(0, 0%, 50.2%, .38);
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: transparent;
  // background: var(--color-body-bg);
}
</style>
