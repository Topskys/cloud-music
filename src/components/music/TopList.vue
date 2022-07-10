<template>
    <div class="TopList">
        <TitleBar name='排行榜' path='/sheet' />
        <div class="BoxList">
            <Square v-for='(item, index) in list' :key='index' :square='item' />
        </div>
    </div>
</template>

<script>
import Square from '@/components/item/Square.vue'
import TitleBar from '@/components/bar/TitleBar.vue'
export default {
    name: 'TopList',
    data() {
        return {
           list: [],
        }
    },
    components: {
        Square,
        TitleBar,
    },
    mounted() {
        this.getTopList()
    },
    methods: {
        // 获取推荐歌单
        async getTopList() {
            let res = await this.$api.music.reqTopList()
            // 对返回的JSON字符串进行裁切
            this.list = res.list.slice(0,5)
        }
    }
}
</script>

<style lang='scss' scoped>
.BoxList {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 20px;
}
</style>