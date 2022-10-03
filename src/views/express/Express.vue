<template>
  <div class="Express">
    <TitleBar name='新歌速递' :path="`/searchMore?type=${1}`" />
    <div class='songs r-flex'>
      <div v-for='(song, index) in newSongs' :key='index' class="s-box r-flex br10" @click='playSong(index)'>
        <div class='s-avatar br10'><img :src="$imgSize(song.al.picUrl, ' 512y512')" style='width:100%;' class='br10'>
        </div>
        <div class='s-info'>
          <p class='fs20 fw600 text-h-n-e'>{{ song.name }}</p>
          <p class='text-h-n-e'>{{ song.ar[0].name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/bar/TitleBar.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Express',
  data() {
    return {
      newSongs: [],// 推荐新歌
      ids: [],//新歌收集id，以获取新歌详情匹配vuex数据格式
    }
  },
  components: {
    TitleBar,
  },
  computed: {
    ...mapState(['playlist',])
  },
  mounted() {
    this.getExpress()
  },
  methods: {
    // 解构
    ...mapMutations(['updatePlaylist', 'changePlaylistIndex', 'changeAutoPlay']),
    // 请求新歌速递
    async getExpress() {
      if (this.$getStorage('musicNewSongs')) {
        this.newSongs = this.$getStorage('musicNewSongs')
        this.newSongs.forEach((item, index) => {
          this.ids[index] = item.id
        })
        return
      }
      let prevNewSong = []//预先接收新歌
      let res1 = await this.$api.music.reqNewSong()
      prevNewSong = res1.result
      prevNewSong.forEach((item, index) => {
        this.ids[index] = item.id
      })
      let res2 = await this.$api.music.reqSongDetails(this.ids)
      this.newSongs = res2.songs
      this.$setStorage("musicNewSongs", this.newSongs )
    },
    // 播放歌曲
    playSong(index) {
      // 改变播放索引
      // 开启自动播放
      // this.ids[0] != this.playlist[0] ? (this.updatePlaylist(this.ids), this.changePlaylistIndex(index), this.changeAutoPlay(true)) : ""// 更新播放id列表
      this.updatePlaylist(this.ids)
      this.changePlaylistIndex(index)
      this.changeAutoPlay(true)
    },
  },
}
</script>

<style lang="scss" scoped="true">
.songs {
  flex-wrap: wrap;

  .s-box {
    width: calc(50% - 10px);
    margin-bottom: 10px;
    overflow: hidden;

    // align-items: center;
    &:nth-child(2n+1) {
      margin-right: 20px;
    }

    &:hover {
      background-color: whitesmoke;
    }
  }

  .s-avatar {
    width: 56px;
    margin: 10px;
  }

  .s-info {
    flex: 1;
    margin: 10px 10px 0 10px;

    p {
      min-width: 200px;
      max-width: 370px;

      &:first-child {
        margin-bottom: 10px;
      }
    }

    @media screen and (max-width: 1200px) {
      p {
        max-width: 370px;
      }
    }

    @media screen and (min-width: 1200px) {
      p {
        max-width: 430px;
      }
    }
  }
}
</style>