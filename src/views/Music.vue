<template>
  <div class="Music">
    <Swiper/>
    <Recommend/>
    <Express/>
    <TopArtists/>
    <TopList/>
  </div>
</template>

<script>
import Swiper from '@/components/music/Swiper.vue'
import Recommend from '@/components/music/Recommend.vue'
import Express from '@/components/music/Express.vue'
import TopArtists from '@/components/music/TopArtists.vue'
import TopList from '@/components/music/TopList.vue'
import {mapMutations} from 'vuex'
export default {
    name:'Music',
    data(){
        return{

        }
    },
    components:{
        Swiper,
        Recommend,
        Express,
        TopArtists,
        TopList,
    },
    created(){
      // 初始化播放列表的sessionStorage
      this.setPlaylistSession()
    },
    methods: {
    ...mapMutations(['setPlaylistSession'])// 解构方法
    }
}
</script>

<style lang='scss' scoped>
@media screen and (max-width: 1200px) {
  .Music {
    margin: 0 5%;
  }
}
@media screen and (min-width: 1200px) {
  .Music {
    margin: 0 10%;
  }
}
</style>