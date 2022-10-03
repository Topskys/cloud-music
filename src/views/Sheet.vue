<template>
  <div class="Sheet mt20" @scroll="scrollLoad($event)">
    <div class="top r-flex">
      <div class="avatar"><img :src="$imgSize(playlist.coverImgUrl,'512y512')" :alt="playlist.name"></div>
      <div class="description">
        <div class="name fs30 fw600 mg20-0">{{ playlist.name }}</div>
        <div class="creator mg10-0">
          <p class='fs18'>Playlist by {{ creator.nickname }}</p>
          <p class=' color1'>最后更新于&nbsp;{{ playlist.updateTime }}&nbsp;·&nbsp;{{ playlist.trackCount }}&nbsp;&nbsp;首歌
          </p>
        </div>
        <div class="introduction  color1 mg20-0">{{ playlist.description }}</div>
        <div class="btn r-flex mb30">
          <div class='play fs20 pg5-10 bgc-1 mr20 br10 pointer' @click="playMusic()"><i class="fa fa-play mr10 "></i>播放
          </div>
          <div class='like fs20 pg5-10 bgc-1 br10 pointer'><i class="fa fa-heart-o" v-if="like"></i><i
              class="fa fa-heart" v-else></i></div>
        </div>
      </div>
    </div>
    <SongTable :music='songs' @playMusic='playMusic' />
    <!-- <GoTop scrollObj=".Sheet" /> -->
  </div>
</template>

<script>
import { dateTime, resetMin } from '@/utils/dateTime.js'
import SongTable from '@/components/table/SongTable.vue'
// import GoTop from '@/components/bar/GoTop.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'Sheet',
  data() {
    return {
      playlist: {} || JSON.parse(sessionStorage.getItem('playlist')),// 歌单详情对象
      creator: {},// 创建歌单者
      songs: [],// 歌单歌曲
      beforeSheetId: 0,// 上一个单id
      like: true,
      ids: [],
      num:20,//请求歌曲数量
    }
  },
  components: {
    SongTable,
    // GoTop,
  },
  mounted() {
    this.getSheetDetail()
    // const million = 1000000;
    // const arr = Array(million);

    // 注：这是稀疏数组，应该为其指定内容，否则不同方式的循环对其的处理方式会不同：
    // const arr = [...Array(million)]

    // console.time('⏳');
    // for (let i =0 ; i <arr.length ; i++) { } // for(倒序)  :- 1.5ms  3.5ms
    // for (let i = 0; i < arr.length; i++) { } // for          :- 1.6ms
    // arr.forEach(v => v)                     // foreach      :- 2.1ms   8ms
    // for (const v of arr) { }                 // for...of     :- 11.7ms
    // console.timeEnd('⏳');

  },
  methods: {
    // 解构
    ...mapMutations(['updatePlaylist', 'changePlaylistIndex', 'changeAutoPlay']),
    // 播放音乐的回调
    playMusic(row) {
      if (this.beforeSheetId != this.$route.query.id && this.ids.length > 0)  {
        this.beforeSheetId = this.$route.query.id
        this.updatePlaylist(this.ids)// 更新播放列表
        this.changePlaylistIndex(0)// 改变播放索引
      }
      if (row) {
        this.changePlaylistIndex(row.index)// 改变播放索引
      }
      this.changeAutoPlay(true) // 开启自动播放
    },
    // 请求歌单详情
    async getSheetDetail() {
      // 判断当前歌单id是否与前一个歌曲id一致
      // if (this.$route.query.id == this.beforeSheetId) {
      //   this.playlist = this.$getStorage('sheetDetail')
      //   this.songs=this.$getStorage("sheetSongs")
      //   return
      // }
      var timestamp = Date.parse(new Date());
      let res = await this.$api.music.reqSheetDetail(this.$route.query.id, timestamp);
      this.playlist = res.playlist
      this.creator = res.playlist.creator
      // 格式化更新日期1
      this.playlist.updateTime = this.$dateTime(new Date(res.playlist.updateTime))
    
      // this.$setStorage({ key: 'sheetDetail', value: this.playlist })

      // 获取歌单歌曲this.playlist.trackCount
      this.getSheetSongs(this.num)

    },

    
    async getSheetSongs(limit = 20, offset = 0) {
      let res = await this.$api.music.reqSheetSongs(this.$route.query.id, limit, offset)
      this.songs = res.songs
      // console.log("fg",this.songs)
      // 格式化歌曲播放时间
      this.songs.forEach((item, index) => {
        this.songs[index].dt = resetMin(item.dt);
        this.ids[index] = item.id
      });
      // this.$setStorage({ key: "sheetSongIds", value: this.ids })
      // this.$setStorage({key: "sheetSongs",value: this.songs})
    },


    // 监听scroll加载更多
    scrollLoad(e){
      let num=7
      if(e.srcElement.offsetHeight + e.srcElement.scrollTop >= e.srcElement.scrollHeight ){
        // this.$set(this,'currentPage',this.currentPage + 1)
        this.num+=10
        this.getSheetSongs()
      }
    }
  },
  watch: {
    // 监听路由变化，重新请求页面数据
    '$route'(to, from) {
      if (to.path!= '/sheet' ) return
      // if(to.query.id==this.beforeSheetId){
      //   this.playlist = this.$getStorage('sheetDetail')
      //   this.ids = this.$getStorage("sheetSongIds")
      //   this.songs = this.$getStorage("sheetSongs")
      //   return
      // }
      // this.beforeSheetId=to.query.id
      this.getSheetDetail()
    },
    // 深度观察监听
    deep: true,
  },
  filters: {
    //格式化日期2//过滤
    resetDate: (value) => {
      let date = new Date(value);// 别漏了这句，否则会报错
      return dateTime(date);
    },
  },

}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1200px) {
  .Sheet {
    margin: 0 0 1.875rem 0;
  }
}

@media screen and (min-width: 1200px) {
  .Sheet {
    margin: 20px 0 0  0;
  }
}


.top {
  margin: 30px 0 50px 0;

  .avatar {
    min-width: 200px;
    max-width: 280px;
    // width:280px;
    margin-right: 60px;

    img {
      width: 100%;
      border-radius: 10px;
      background-position: center;
      background-size: cover;
    }
  }

  .description {
    // flex布局，flex: 1表示占据.avatar剩余的空间位置
    flex: 1;

    // 不换行超出文本出现省略号的效果
    .name {
      width: 100%;
      // overflow: hidden;
      // white-space:nowrap;
      // text-overflow: ellipsis;
    }

    .introduction {
      max-height: 4rem;
      // 多行超出文本出现省略号的效果
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }


  }

  .btn {
    align-items: center;

    .play {
      transition: all .3s linear;

      &:hover {
        color: white;
        background-color: #335eea;
        transform: scale(0.9);
        /* 盒子阴影 */
        box-shadow: 4px 20px 40px 5px rgba(0, 0, 0, .1);
      }
    }

    .like {
      transition: all .3s linear;

      &:hover {
        transform: scale(0.9);
        /* 盒子阴影 */
        box-shadow: 4px 20px 40px 5px rgba(0, 0, 0, .1);
      }
    }
  }
}
</style>