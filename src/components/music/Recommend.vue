<template>
    <div class="Recommend">
        <TitleBar name='推荐歌单' path='/sheet' />
        <div class="BoxList">
            <Square v-for='(item,index) in playlists' :key='index' :square='item' />
        </div>
    </div>
</template>

<script>
import Square from '@/components/item/Square.vue'
import TitleBar from '@/components/bar/TitleBar.vue'
export default {
    name:'Recommend',
    data(){
        return{
            playlists:[],// 歌单
        }
    },
    components:{
        Square,
        TitleBar,
    },
    mounted(){
this.getSheets()
    },
    methods:{
        // 获取推荐歌单
        async getSheets(){
            let res=await this.$api.music.reqRecommend()
            this.playlists=res.playlists
        }
    }
}
</script>

<style lang='scss' scoped>
.BoxList{
    display:grid;
    grid-template-columns:repeat(5,1fr);
    grid-template-rows: repeat(2, 1fr);
    gap:20px;
}
</style>