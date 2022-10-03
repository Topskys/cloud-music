<template>
  <div class="Swiper" v-show="banners ? true : false">
    <el-carousel :interval="4000" type="card" height="12.5rem" class="carousel">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <a :href="item.url ? item.url:''" :target="{_blank:item.url}"><img :src="item.imageUrl"
            style="width: 100%;height: 100%;" /></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  data() {
    return {
      banners: [],
    }
  },
  created() {
    this.getBanner()
  },
  methods: {
    // 获取首页banner数据
    async getBanner() {
      let result = this.$getStorage('banners')
      this.banners = result ? result : (await this.$api.music.reqBanner()).banners
      this.$setStorage("banners", this.banners)
    },
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  margin: 20px 0;
}

.el-carousel__item {
  border-radius: 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
</style>