<template>
  <div class="Music">
    <Swiper/>
    <Recommend/>
  </div>
</template>

<script>
import Swiper from '@/components/music/Swiper.vue'
import Recommend from '@/components/music/Recommend.vue'
export default {
    name:'Music',
    data(){
        return{

        }
    },
    components:{
        Swiper,
        Recommend,
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