<template>
  <div class="Circles c-flex br10">
    <router-link :to="path" class='link-img'><img :src="circles.picUrl" ></router-link>
    <router-link :to="path" class="link-name mg20-0 fs24 fw600">{{circles.name}}</router-link>
  </div>
</template>

<script>
import TitleBar from '@/components/bar/TitleBar'
export default {
  name: 'Circles',
  props: ['circles','path'],
  data() {
    return {
      beforeArtistId: '', // 存储上一次点击的歌手id// 节流 // 防抖
    }
  },
  components:{
    TitleBar
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.Circles {
  align-items:center;
  
  .link-img{
    // min-width:150px;
    transition: all .2s linear;
    border-radius: 50%;
    // padding: 5px;
    img {
      width: 100%;
      min-height:185px;
      max-height: 300px;
      border-radius: 50%;
    }
    &:hover {
      color: white;
      // background-color:#335eea;
      transform: scale(1.07);
      /* 盒子阴影 */
      box-shadow: 4px 20px 40px 5px rgba(0, 0, 0, .1);
    }
  }
  .link-name{
    overflow:hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>