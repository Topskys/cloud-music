<template>
  <div class="PlayList">
    <h1 style="font-size: 24px; font-weight: bold;">播放列表</h1>
    <el-table :data="tableData" style="width: 100%" :show-header="false">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column  prop="name" label="姓名"></el-table-column>
      <el-table-column label="操作">
          
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name:'PlayList',
    data(){
        return {

        }
    },

}
</script>

<style>

</style>