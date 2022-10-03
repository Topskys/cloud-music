<template>
  <div class="Music">
    <Swiper />
    <Recommend />
    <Express />
    <TopArtists />
    <TopList />
  </div>
</template>

<script>
import Swiper from '@/views/swiper/Swiper.vue'
import Recommend from '@/views/recommend/Recommend.vue'
import Express from '@/views/express/Express.vue'
import TopArtists from '@/views/artist/TopArtists.vue'
import TopList from '@/views/sheet/TopList.vue'

export default {
  name: 'Music',
  components: {
    Swiper,
    Recommend,
    Express,
    TopArtists,
    TopList,
  },
}
</script>

