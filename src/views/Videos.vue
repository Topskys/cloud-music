<template>
  <div class="Videos">
    <TitleBar name='视频' :path="`/searchMore?type=${1014}`" v-show="videos.length > 0 ? true : false" />
    <div class="BoxList2 grid">
      <Rectangle v-for='(item, index) in videos' :key='index' :rectangle='item' />
    </div>
    <TitleBar name='MV' :path="`/searchMore?type=${1004}`" v-show="mvs.length > 0 ? true : false" />
    <div class="BoxList2 grid ">
      <Rectangle v-for='(item, index) in mvs' :key='index' :rectangle='item' />
    </div>
  </div>
</template>

<script>
import Rectangle from '@/components/item/Rectangle.vue'
import TitleBar from '@/components/bar/TitleBar.vue'
export default {
    name:'Videos',
    data(){
        return{
          videos: [],// 视频
          mvs: [],// mv
        }
    },
  components: {
    Rectangle,
    TitleBar,
  },
  created() {
    // this.getVideoRecommend()
  },
  methods:{
    // async getVideoRecommend(){
    //   // let res = await this.$api.video.reqVideoRecommend()
    //   console.log(res.msg)
    //   this.videos=res.videos
    // }
  }
}
</script>

<style lang='scss' scoped>

@media screen and (max-width: 1200px) {
  .Videos {
    margin: 0 5%;
  }
}
@media screen and (min-width: 1200px) {
  .Videos {
    margin: 0 10%;
  }
}
</style>