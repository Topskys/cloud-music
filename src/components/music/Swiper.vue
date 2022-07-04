<template>
  <div class="Swiper">
    <el-carousel :interval="4000" type="card" height="12.5rem" class="carousel" v-show="banners?true:false">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <a :href="item.url"><img :src="item.imageUrl" :alt="item.targetId" style="width: 100%;height: 100%;"></img></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name:'Swiper',
  data(){
    return {
      banners:[],
    }
  },
  mounted(){
    this.getBanner()
  },
  methods:{
    // 获取banner图片
    async getBanner(){
      let res = await this.$api.music.reqBanner()
      this.banners = res.banners
    },
    
  }
}
</script>

<style lang="scss" scoped>
.carousel {
      margin:20px 0;
    }

.el-carousel__item{
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