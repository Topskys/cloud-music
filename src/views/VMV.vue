<template>
  <div class="VMV">
    <div class="video__container br20">
      <video ref='video' :src="videoURL" autoplay controls @play="changePlayMusicState"></video>
    </div>
    <div class="detail">
      <div class="header">
        <div class='title fs24 fw600 mg10-0'>{{ videoDetail.title || videoDetail.name }}</div>
        <div class='publishTime fs12 opacity68 '>{{ (videoDetail.playTime / 10000).toFixed(1) }}万&nbsp;Views·{{
          videoDetail.publishTime
          }}
        </div>
      </div>
      <div class="creator r-flex mg20-0">
        <div class="avatar mr10"><img :src="$imgSize(creator.avatarUrl || videoDetail.cover,'224y224')"></div>
        <div class="nickname fs14 opacity88">{{ creator.nickname || artistName }}</div>
      </div>
    </div>
    <div class='similar mg50-0'>
      <div class='title fs18 opacity88  fw600 mg20-0' v-show="similar.length > 0 ? true : false">相关视频</div>
      <div class="BoxList2 grid">
        <Rectangle v-for='(item, index) in similar' :key='index' :rectangle='item' />
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
      similar: [],// 相关视频/mv
      creator: {},// 发布者
      artistName: '',// 艺术家
      beforeId: 0,
    }
  },
  components: {
    Rectangle,
  },
  computed: {
    ...mapState(['isAutoPlay'])
  },
  created() {
    this.getVideo()
  },
  methods: {
    // 解构
    ...mapMutations(['changePlay', 'changeAutoPlay', 'updateMainHeight']),

    // 当播放视频时需要关掉音乐
    changePlayMusicState() {
      if (this.$refs.video.play()) {
        this.changePlay(false)// 关闭音乐
        this.changeAutoPlay(false)// 关闭自动播放
      }
    },

    // 获取视频数据
    async getVideo() {
      // 搜索类型为1014时，返回的数据有视频和mv，他们的id不同，视频id由字母和数字组成，而mv的id只有数字组成
      let isVideo = /\\d\\W\\S+/g.test(parseInt(this.$route.query.id))//匹配数字非字母非空白
      if (!isVideo && this.$route.query.type == 1) {// video
        // 获取视频详情
        this.getVideoDetail()
        // 请求视频播放地址
        this.getVideoUrl()
        // 请求相似视频
        this.getSimilar()
      } else {// mv
        this.getMVDetail()
        this.getMVUrl()
      }
    },

    async getVideoDetail() {
      let { data } = await this.$api.video.reqVideoDetail(this.$route.query.id)
      this.videoDetail = data
      this.creator = data.creator
      // 格式化时间2022-7-3
      this.videoDetail.publishTime = this.$dateTime(this.videoDetail.publishTime)
      this.$setStorage("videoDetail", this.videoDetail)
      this.$setStorage("videoDetailCreator", this.creator)
    },


    async getMVDetail() {
      let { data } = await this.$api.video.reqMVDetail(this.$route.query.id)
      this.videoDetail = data
      this.artistName = data.artists[0].name
      // this.similar = this.videoDetail.videoGroup.slice(0,5)
      this.$setStorage("videoDetail", this.videoDetail,)
      this.$setStorage("videoDetailArtistName", this.artistName)
    },

    async getVideoUrl() {
      this.videoURL = (await this.$api.video.reqVideoURL(this.$route.query.id)).urls[0].url
      this.$setStorage("videoURL", this.videoURL)
    },

    async getSimilar() {
      this.similar = (await this.$api.video.reqSimilarVideo(this.$route.query.id)).data
      this.$setStorage("videoSimilar", this.similar)
    },

    async getMVUrl() {
      this.videoURL = (await this.$api.video.reqMVURL(this.$route.query.id)).data.url
      this.$setStorage("videoURL", this.videoURL)
    }
  },
  watch: {
    // 监听路由，重新发送请求
    // $route(to, from) {
    //   if (to.path === '/vmv') {
    //     this.getVideo()
    //     return
    //   }
    // },
    '$route'(to, from) {
      to.path == '/vmv' ? to.query.id == this.beforeId ?
        (this.videoDetail = this.$getStorage('videoDetail'),
          this.creator = this.$getStorage("videoDetailCreator"),
          this.artistName = this.$getStorage("videoDetailArtistName"),
          this.videoURL = this.$getStorage("videoURL"),
          this.similar = this.$getStorage("videoSimilar"))
        : this.getVideo() : ''
      this.beforeId = to.query.id
    },
  },

}
</script>

<style lang='scss' scoped>
.VMV {
  .video__container {
    min-height: 537.9px;
    max-height: calc(100vh - 200px);
    object-fit: fill;
    background: transparent;
    background-color: #000;
    overflow: hidden;
    text-align: center;
    

    video {
      width: 100%;
      max-height: inherit;
    }
  }

  .creator {
    align-items: center;

    .avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;

      img {
        // width: 100%;
        // height: 100%;
        border-radius: 50%;
        // background-position: center center;
        // background-size: cover;
        width: 100%;
        aspect-ratio: 1/1;
      }
    }

  }

  .similar {
    .BoxList2 {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(1, 1fr);
    }
  }
}



// 修改视频默认样式
// 播放暂停控制按钮
video::-webkit-media-controls-play-button {
  // position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
}

// 进图条
// video::-webkit-media-controls-timeline{
//   position:absolute;
//   bottom:2px;
//   left:80px;
//   width:65%;
//   background-color:#335eea;
// }


// 声音按钮
// video::-webkit-media-controls-mute-button {}


// video::-internal-media-controls-download-button {
//   display: none;
// }

// video::-webkit-media-controls-enclosure {
//   overflow: hidden;
// }

// video::-webkit-media-controls-panel {
//   width: calc(100% + 30px);
// }
</style>