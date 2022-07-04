<template>
  <div class="VMV">
    <video class='br20' ref='video' :src="videoURL" autoplay controls  @play="changePlayVideo" @pause="changePlayVideo"
      @ended="changePlayVideo"></video>
    <div class="detail">
      <div class="header">
        <div class='title fs24 fw600 mg20-0'>{{ videoDetail.title }}</div>
        <div class='publishTime'>{{ (videoDetail.playTime / 10000).toFixed(1) }}万&nbsp;Views·{{ videoDetail.publishTime
        }}
        </div>
      </div>
      <div class="creator r-flex mg20-0">
        <img class='mr10' :src="creator.avatarUrl" :alt="creator.nickname">
        <div class="nickname fs18">{{ creator.nickname }}</div>
      </div>
    </div>
    <div class='similar mg50-0'>
      <div class='title fs24 fw600 mg20-0'>相关视频</div>
      <div class="BoxList2 grid">
        <Rectangle v-for='(item, index) in similarVideos' :key='index' :rectangle='item' />
      </div>
    </div>
  </div>
</template>

<script>
import Rectangle from '@/components/item/Rectangle.vue'
import { dateTime } from '@/utils/dateTime.js'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'VMV',
  data() {
    return {
      videoDetail: {},// 视频详情
      videoURL: '',// 视频地址
      similarVideos: [],// 相关视频
      creator: {},// 发布者
    }
  },
  components: {
    Rectangle,
  },
  computed: {
    ...mapState(['isAutoPlay'])
  },
  mounted() {
    this.getVideo()
  },
  methods: {
    // 解构
    ...mapMutations(['changePlay', 'changeAutoPlay']),
    // 当播放视频时需要关掉音乐
    changePlayVideo() {
      if (this.$refs.video.play()) {
        this.changePlay(false)// 关闭音乐
        this.changeAutoPlay(false)// 关闭自动播放
      }
      // if (this.$refs.video.end()) {
      //   this.$refs.video.pause()// 暂停
      // }
    },
    async getVideo() {
      let res1 = await this.$api.video.reqVideoDetail(this.$route.query.id)
      this.videoDetail = res1.data
      // 格式化时间2022-7-3
      this.videoDetail.publishTime = dateTime(this.videoDetail.publishTime)
      this.creator = res1.data.creator
      // console.log(res1)
      // 请求视频播放地址
      let res2 = await this.$api.video.reqVideoURL(this.$route.query.id)
      // console.log(res2)
      this.videoURL = res2.urls[0].url
      // 请求相似视频
      let res3 = await this.$api.video.reqSimilarVideo(this.$route.query.id)
      this.similarVideos = res3.data
      // console.log(res3.data)
    }
  },
  watch: {
    // 监听路由，重新发送请求
    $route(to, from) {
      this.$refs.video.pause()// 暂停
      if (to.path == '/vmv') {
        this.getVideo()
      }
    },
    'isAutoPlay'(newVal, oldVal) {
      console.log("isA-", newVal, oldVal);
    },
    'this.$refs.video.currentTime'(newVal, oldVal) {
      console.log("cu-vi", newVal, oldVal);
    }
  },
  destroyed() {
    if (this.$refs.video.play()) {
      this.$refs.video.pause()// 暂停
    }
  },

}
</script>

<style lang='scss' scoped>
.VMV {
  video {
    width: 100%;
    height: 100%;
    // min-height: 537.9px;
    object-fit: fill;
    position:relative;
  }

  .creator {
    align-items: center;

    img {
      width: 56px;
      border-radius: 50%;
    }
  }

  .similar {
    .BoxList2 {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(1, 1fr);
    }
  }
}

@media screen and (max-width: 1200px) {
  .VMV {
    margin: 0 5% 1.875rem 5%;
  }
}

@media screen and (min-width: 1200px) {
  .VMV {
    margin: 20px 10% 0 10%;
  }
}


// 修改视频默认样式
video::-webkit-media-controls-play-button{
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%)
}
</style>