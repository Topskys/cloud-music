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
        // 主页排行榜
        async getTopList() {
            let result = this.$getStorage('musicTopList')
            // 对返回的JSON字符串进行裁切
            this.list = result ? result : (await this.$api.music.reqTopList()).list.slice(0, 5)
            this.$setStorage("musicTopList", this.list)
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