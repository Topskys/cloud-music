<template>
  <div class="Circles  br10">
    <div class='link-img'>
      <router-link :to="path"><img :src="$imgSize(circles.picUrl, '512y512')"></router-link>
    </div>

    <div class="mg20-0 fs20 fw600" align="center">
      <router-link :to="path" class="link-name">{{ circles.name }}</router-link>
    </div>

  </div>
</template>

<script>
import TitleBar from '@/components/bar/TitleBar'
export default {
  name: 'Circles',
  props: ['circles', 'path'],
  data() {
    return {
      beforeArtistId: '', // 存储上一次点击的歌手id// 节流 // 防抖
    }
  },
  components: {
    TitleBar
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.Circles {
  .link-img {
    transition: all .2s linear;
    border-radius: 50%;

    img {
      // display: block;
      // width: 100%;
      // min-height:11.5625rem;
      // max-height: 18.75rem;
      width: 100%;
      aspect-ratio: 1/1;
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

  .link-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>