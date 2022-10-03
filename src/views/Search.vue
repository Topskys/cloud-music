<template>
  <div class="Search">
    <TitleBar name='艺人' :path="`/searchMore?type=${100}`" v-show="artists.length > 0 ? true : false" />
    <!-- {path:'/path',query:{id:'123'}} :path=-->
    <div class='artist grid'>
      <Circles v-for='artist in artists' :key="artist.id" :circles='artist' :path="`/artist?id=${artist.id}`" />
    </div>

    <TitleBar name='歌曲' :path="`/searchMore?type=${1}`" v-show="songs.length > 0 ? true : false" />
    <SongTable :music='songs' @playMusic='playMusic' />
    <!-- <div class='songs r-flex'>
      <div v-for='song, index in songs' :key='index' class="s-box r-flex br10" @click='playSong(index)'>
        <div class='s-avatar br10'><img :src='song.al.picUrl' style='width:100%;' class='br10'></div>
        <div class='s-info'>
          <p class='fs20 fw600 text-h-n-e'>{{ song.name }}</p>
          <p class='text-h-n-e'>{{ song.ar[0].name }}</p>
        </div>
      </div>
    </div> -->
    <TitleBar name='歌单' :path="`/searchMore?type=${1000}`" v-show="playlists.length > 0 ? true : false" />
    <div class="BoxList1 grid">
      <Square v-for='(item, index) in playlists' :key='index' :square='item' />
    </div>
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
import Circles from '@/components/item/Circles.vue'
import Square from '@/components/item/Square.vue'
import Rectangle from '@/components/item/Rectangle.vue'
import TitleBar from '@/components/bar/TitleBar.vue'
import SongTable from '@/components/table/SongTable.vue'
import { mapState, mapMutations } from 'vuex'
import { resetMin } from '@/utils/dateTime.js'
export default {
  name: "Search",
  data() {
    return {
      artists: [],// 艺人
      songs: [],// 歌曲列表
      ids: [],// 收集id
      playlists: [],// 搜索歌单列表
      // albums:[],// 专辑
      videos: [],// 视频
      mvs: [],// mv
      beforeKeyWords: "",
    }
  },
  components: {
    Circles,
    Square,
    Rectangle,
    TitleBar,
    SongTable,
  },
  created() {
    this.getSearch()
  },
  computed: {
    ...mapState(['playlist',])
  },
  methods: {
    // 解构
    ...mapMutations(['updatePlaylist', 'pushPlaylist', 'changePlaylistIndex', 'changeAutoPlay']),

    // 搜索
    // 可选参数: limit: 返回数量, 默认为 30 offset: 偏移数量，用于分页, 如 : 如: (页数 - 1) * 30, 其中 30 为 limit 的值, 默认为 0
    // type: 搜索类型；默认为 1 即单曲, 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018: 综合, 2000: 声音(搜索声音返回字段格式会不一样)
    async getSearch() {
      // 综合
      //let res=await this.$api.music.reqSearch(this.$route.query.keywords,1018 , limit, offset );
      this.searchArtist()
      this.searchSong()
      this.searchSheet()
      // this.searchAlbum()
      this.searchVideo()// 包含video和mv

    },
    getExplore(type = 1, limit = 10, offset = 0) {
      return this.$api.music.reqSearch(this.$route.query.keywords, type, limit, offset);
    },

    // 搜搜艺人
    async searchArtist() {
      let res = await this.getExplore(100, 5)
      this.artists = res.result.artists;
      this.$setStorage("searchArtist", this.artists)
    },

    // 搜搜单曲
    async searchSong() {
      let prevSongs = []
      let prevRes = await this.getExplore(1, 8)
      prevSongs = prevRes.result.songs
      // 收集id
      prevSongs.forEach((item, index) => {
        this.ids[index] = item.id;
      });
      // 请求歌曲详情
      let res = await this.$api.music.reqSongDetails(this.ids)
      this.songs = res.songs
      // 格式化歌曲播放时间
      this.songs.forEach((item, index) => {
        this.songs[index].dt = resetMin(item.dt);
      });
      this.$setStorage("searchSongsDetail", this.songs)
    },

    // 请求搜索歌单
    async searchSheet() {
      let res = await this.getExplore(1000);
      this.playlists = res.result.playlists
      this.$setStorage("searchPlaylists", this.playlists)
    },

    // 请求搜索专辑
    // async searchAlbum(){
    //   let res=await this.getExplore(10,5);
    //    this.albums=res.result.albums// 专辑
    //   console.log("a+",res)
    // },


    // 搜索视频/mv 
    // 这个接口含有mv
    // 过滤，筛选出视频(type为1)/mv(type为0)
    // filter()：返回一个数组对原数组没有影响
    // slice()：分割数据，取四个视频/mv
    async searchVideo() {
      let res = await this.getExplore(1014, 30);
      this.list = res.result.videos
      this.videos = this.list.filter(item => item.type == 1).slice(0, 4)
      this.mvs = this.list.filter(item => item.type == 0).slice(0, 4)
      this.$setStorage("searchVideos", this.videos)
      this.$setStorage("searchMVs", this.mvs)
    },


    // 播放歌曲
    // 配置SongTable.vue使用
    playMusic(row) {
      if (this.songs[0] != this.playlist[0]) {
        this.pushPlaylist(row.id)// 将这首歌添加到播放列表的最后
        // this.updatePlaylist(this.ids)// 更新播放列表
      }
      this.changePlaylistIndex(this.playlist.length - 1)// 改变播放索引，播放刚添加的最后一首歌曲
      this.changeAutoPlay(true) // 开启自动播放
    },


    // playSong(index) {
    //   if (this.songs[0] != this.playlist[0]) {
    //     this.updatePlaylist(this.ids)// 更新播放列表
    //   }
    //   this.changePlaylistIndex(index)// 改变播放索引
    //   this.changeAutoPlay(true) // 开启自动播放
    // },
  },
  watch: {
    '$route': function (to, from) {
      to.path == '/search' ? to.query.keywords == this.beforeKeyWords ? (
        this.artists = this.$getStorage('searchArtists'),
        this.songs = this.$getStorage("searchSongsDetail"),
        this.playlists = this.$getStorage("searchPlaylists"),
        this.videos = this.$getStorage("searchVideos"),
        this.mvs = this.$getStorage("searchMVs"))
        : this.getSearch() : ''
      this.beforeKeyWords = to.query.keywords
    },
  }
}  
</script>

<style lang="scss" scoped>
.Search {

  .artist {
    grid-template-rows: auto;
    grid-template-columns: repeat(5, 1fr);

  }

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

    // ul>li {
    //   height: 56px;
    //   align-items: center;
    //   border-bottom: 1px solid whitesmoke;
    //   &:hover {
    //     background-color: whitesmoke;
    //   }

    //   span {
    //     width: calc(100%/3);
    //     font-size: 18px;
    //     overflow: hidden;
    //     // 超出文本出现省略号的效果
    //     overflow: hidden;
    //     white-space: nowrap;
    //     text-overflow: ellipsis;

    //     &:first-child {
    //       font-size: 20px;
    //       font-weight: 600;
    //       margin-left: 10px;
    //     }

    //     &:nth-child(2) {
    //       text-align: center;
    //     }

    //     &:last-child {
    //       text-align: end;
    //       margin-right: 10px;
    //     }

    //   }
    // }
  }
}

.BoxList1 {
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.BoxList2 {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
}
</style>




