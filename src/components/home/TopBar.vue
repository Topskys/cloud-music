<template>
  <div class="TopBar r-flex">
    <!-- 左 -->
    <div class="left w-h r-flex">
      <div class="logo"><a href="/" style="color: #000">CloudMusic</a></div>
      <div class="arrow">
        <i class="fa-pg fa fa-chevron-left" @click="$router.go(-1)"></i>
        <i class="fa-pg fa fa-chevron-right" @click="$router.go(1)"></i>
      </div>
    </div>
    <!-- 中 -->
    <nav class="middle w-h">
      <router-link to="/music">音乐</router-link>
      <router-link to="/videos">视频</router-link>
      <router-link to="/mine">我的</router-link>
    </nav>

    <!-- 右 -->
    <div class="right w-h r-flex">
      <div class="search">
        <el-input v-model="keywords" prefix-icon="el-icon-search" clearable size="mini" placeholder="search"
          @keyup.enter.native="goSearch">
        </el-input>
      </div>
      <div class="user">
        <!-- 头像 -->
        <div class="avatar" style="width: 36px;">
          <img src="@/assets/imgs/wy-logo.jpg" alt="avatar" style="width: 100%; border-radius: 50%;">
        </div>
        <!-- 菜单 -->
        <!-- 登录 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      keywords: '',// 搜索关键词
    };
  },
  methods: {

    // 去搜索的回调
    goSearch() {
      if (!this.keywords) {
        this.$message.warning('关键词不能为空')
        return
      }
      // 这种方式在配置路由 路径 只需'/search' 不要加 '/:keywords'
      // 获取：this.$route.query.keywords
      this.$router.push({
        path: '/search',
        query: {
          keywords: this.keywords,
        }
      })
    },
  }
}
</script>

<style lang='scss' scoped>

.TopBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-width: 960px;
  height: 60px;
  z-index: 999;
  justify-content: space-between;
  align-items: center;
  //  设置背景透明
  // background-color: rgba(0, 0, 0, 0.5);

  .w-h {
    width: calc(100vw / 3);
    height: 60px;
  }

  .left {
    justify-content: space-between;
    align-items: center;

    .logo {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 2px;
      // margin-left: 15%;
    }

    .arrow {
      margin-right: 5%;
      // width: 53px;
      min-width: 53px;

      .fa {
        font-size: 16px;
        // padding: 5px;
        // border-radius: 5px;

        &:first-child {
          margin-right: 10px;
        }

        &:hover {
          background-color: whitesmoke;
        }
      }
    }
  }

  .middle {
    // background: pink;
    padding: 0;
    line-height: 60px;
    text-align:center;
    min-width: 256px;

    a {
      color: black;
      font-size: 22px;
      font-weight: 600;
      // 不让文字换行
      white-space: nowrap;

      &:nth-child(2) {
        margin: 0 55px;
      }

      &.router-link-exact-active {
        color: blue;
      }
    }
  }

  .right {
    // background: goldenrod;
    justify-content: flex-end;
    align-items: center;

    // .search{
    // // outline: none;
    // }
    // .user {
    //   // margin: 0 15% 0 20px;
    // }
  }
}


@media screen and (max-width: 1200px) {
  .logo {
    margin-left: 15%;
  }
  .user{
    margin: 0 15% 0 20px;
  }
}

@media screen and (min-width: 1200px) {
  .logo {
    margin-left: 30%;
  }
  .user{
    margin: 0 30% 0 20px;
  }
}
</style>