<template>
  <div class="SongTable">
    <el-table :data="music" style="width: 100%" :show-header="false" size='mini' :row-class-name="rowClassName"
      @row-click='toPlaySong'>
      <el-table-column prop='al.picUrl' label="海报" width="70">
        <template slot-scope="{ row}">
          <img :src="$imgSize(row.al.picUrl, '224y224')" style="width:50px;height:50px;line-height:88px;border-radius: 10px;">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标题">
        <template slot-scope="{ row}">
          <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手">
      </el-table-column>
      <el-table-column prop="dt" label="时长" width="100">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>

export default {
  name: 'SongTable',
  props: {
    music:{
      type: Array,
      default:[],// 歌单
    }
  },
  data() {
    return {
      beforePlaylistIndex:-1,// 上一首索引
    }
  },
  methods: {
    // 渲染表格自动触发
    rowClassName({ row, rowIndex }) {//必须是rowIndex参数，不能随便写
      row.index = rowIndex;//把每一行的索引rowIndex放进row
    },
    // 播放歌曲
    toPlaySong(row){
      // 子传父回调playMusic事件且传行对象（歌曲id，rowIndex...）
      if(this.beforePlaylistIndex==row.index) return
      this.$emit('playMusic',row)
      this.beforePlaylistIndex=row.index
    },
  }
}
</script>

<style lang='scss' scoped>
.SongTable{
  width: 100%;
  // margin:10px 5%;
}

::v-deep.el-table  tr{
  color:#525252;
    font-size: 18px;
    border-radius: 10px;
}
::v-deep.el-table .el-table__cell:nth-child(2){
  color:black;
  font-size: 20px;
  font-weight: 600;
}  

</style>