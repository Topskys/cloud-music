<template>
  <div class="Sheet mt20">
    <div class="top r-flex">
      <div class="avatar"><img :src="playlist.coverImgUrl" :alt="playlist.name"></div>
      <div class="description">
        <div class="name fs30 fw600 mg20-0">{{ playlist.name }}</div>
        <div class="creator mg10-0">
          <p class='fs18'>Playlist by {{ creator.nickname }}</p>
          <p class=' color1'>最后更新于&nbsp;{{ playlist.updateTime }}&nbsp;·&nbsp;{{ playlist.trackCount }}&nbsp;&nbsp;首歌
          </p>
        </div>
        <div class="introduction  color1 mg20-0">{{ playlist.description }}</div>
        <div class="btn r-flex mb30">
          <div class='play fs20 pg10-15 bgc-1 mr20 br10 pointer' @click="playMusic()"><i
              class="fa fa-play mr10 "></i>播放</div>
          <div class='like pg10-15 bgc-1 br10 pointer'><i class="fa fa-heart-o" v-if="like"></i><i class="fa fa-heart"
              v-else></i></div>
        </div>
      </div>
    </div>
    <SongTable :music='songs' @playMusic='playMusic'/>
    <!-- <GoTop scrollObj=".Sheet" /> -->
  </div>
</template>

<script>
import { dateTime, resetMin } from '@/utils/dateTime.js'
import SongTable from '@/components/table/SongTable.vue'
// import GoTop from '@/components/bar/GoTop.vue'
import {mapMutations} from 'vuex'
export default {
  name: 'Sheet',
  data() {
    return {
      playlist: {} || JSON.parse(sessionStorage.getItem('playlist')),// 歌单详情对象
      creator: {},// 创建歌单者
      songs: [],// 歌单歌曲
      beforeSheetId:0,// 上一个单id
      like: true,
    }
  },
  components: {
    SongTable,
    // GoTop,
  },
  mounted() {
    this.getSheetDetail()
  },
  methods: {
    ...mapMutations(['updatePlaylist', 'changePlaylistIndex','changeAutoPlay']),
    playMusic(row){
      if (this.beforeSheetId!=this.$route.query.id ){
        this.beforeSheetId=this.$route.query.id
        this.updatePlaylist(this.songs)// 更新播放列表
      }
      if(row){
        this.changePlaylistIndex(row.index )// 改变播放索引
      }else{
        this.changePlaylistIndex(0 )// 改变播放索引
      }
      this.changeAutoPlay(true) // 开启自动播放
    },
    // 请求歌单详情
    async getSheetDetail() {
      var timestamp = Date.parse(new Date());
      let res = await this.$api.music.reqSheetDetail(this.$route.query.id, timestamp);
      this.playlist = res.playlist
      this.creator = res.playlist.creator
      // console.log(res.playlist)
      // 格式化更新日期1
      this.playlist.updateTime = dateTime(new Date(res.playlist.updateTime))
      sessionStorage.setItem('playlist', JSON.stringify(this.playlist))
      this.getSheetSongs()//res.playlist.trackCount
    },
    
    // 获取歌单歌曲
    async getSheetSongs(limit=100,offset=0){
      let res = await this.$api.music.reqSheetSongs(this.$route.query.id,limit,offset)
      this.songs=res.songs
      // 格式化歌曲播放时间
      this.songs.forEach((item, index) => {
        this.songs[index].dt = resetMin(item.dt);
      });
      
    }, 
    
    // 播放按钮的回调
    playAllMusic(id) {
      this.$store.commit('changePlay', true)
      this.$store.commit('changeSheetId', id)
    },
    
  },
  watch: {
    // 监听路由变化，重新请求页面数据
    $route(to, from) {
      if (to.path != '/sheet') return
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
    margin: 0 5% 1.875rem 5%;
  }
}
@media screen and (min-width: 1200px) {
  .Sheet {
    margin: 20px 10% 0 10%;
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
    align-items:center;
    .play {
      transition: all .2s linear;

      &:hover {
        color:white;
        background-color:#335eea;
        transform: scale(1.07);
        /* 盒子阴影 */
        box-shadow: 4px 20px 40px 5px rgba(0, 0, 0, .1);
      }
    }

    .like {
      transition: all .2s linear;

      &:hover {
        transform: scale(1.07);
        /* 盒子阴影 */
        box-shadow: 4px 20px 40px 5px rgba(0, 0, 0, .1);
      }
    }
  }
}
</style>