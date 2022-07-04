# cloud-music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




##### 困难
```
歌曲列表切换播放歌曲下标，实现列表随意点击播放。
只有第一次进来歌单随意点击的歌曲可以播放（其歌曲下标父组件可以接收），第二次以后的随机点击的歌曲下标均在父组件sheet中接受不到，也就不能播放。
// 子
this.$emit('playMusic',row)

// 父
// if (this.beforeSheetId==this.$route.query.id ){
      //   return 
      // }else{
      //   this.beforeSheetId=this.$route.query.id
      //   this.updatePlaylist(this.songs)// 更新播放列表
      // }
      // 
      // this.changePlaylistIndex(row.index)// 改变播放索引
      
      // this.changeAutoPlay(true)

      // 原因：return 
      // 解决：
      playMusic(row){
      console.log("父",row.index)
      if (this.beforeSheetId!=this.$route.query.id ){
        this.beforeSheetId=this.$route.query.id
        this.updatePlaylist(this.songs)// 更新播放列表
      }
      this.changePlaylistIndex(row.index)// 改变播放索引
      this.changeAutoPlay(true) // 开启自动播放
    },
```
