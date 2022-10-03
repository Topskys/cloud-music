<template>
  <div class="Videos">
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane label="视频" name="first">
        <VideoPage />
      </el-tab-pane>
      <el-tab-pane label="MV" name="second">
        <MVPage />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Rectangle from '@/components/item/Rectangle.vue'
import TitleBar from '@/components/bar/TitleBar.vue'
import VideoPage from '@/components/videos/VideoPage.vue'
import MVPage from '@/components/videos/MVPage.vue'
export default {
  name: 'Videos',
  data() {
    return {
      videos: [],// 视频
      mvs: [],// mv
      active: 'first',
    }
  },
  components: {
    Rectangle,
    TitleBar,
    VideoPage,
    MVPage,
  },
  created() {
    // this.getVideoRecommend()
  },
  methods: {
    //列表切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // async getVideoRecommend(){
    //   // let res = await this.$api.video.reqVideoRecommend()
    //   console.log(res.msg)
    //   this.videos=res.videos
    // }
  }
}
</script>

<style lang='scss' scoped>
.Videos {
  span {
    padding: 5px 10px;
    margin: 10px 0;
    font-size: 18px;
    border-radius: 10px;
  }

  .a-active {
    // border-bottom: 3px solid #335eea;
    color: #335eea;
    font-weight: 600;
    background-color: whitesmoke;
  }
}



// 消除横线
::v-deep .el-tabs__nav-wrap::after {
  display: none;
}

// 修改选中字体颜色
::v-deep .el-tabs__item.is-active {
  color: #335eea;
}

// 选中下滑线背景颜色
::v-deep.is-active {
  background-color: #335eea;
}
</style>