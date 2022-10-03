<template>
    <div class="Recommend">
        <TitleBar name='推荐歌单' path='/sheet' />
        <div class="BoxList">
            <Square v-for='(item, index) in playlists' :key='index' :square='item' style="width: 100%;" />
        </div>
    </div>
</template>

<script>
import Square from '@/components/item/Square.vue'
import TitleBar from '@/components/bar/TitleBar.vue'
export default {
    name: 'Recommend',
    data() {
        return {
            playlists: [],// 歌单
        }
    },
    components: {
        Square,
        TitleBar,
    },
    mounted() {
        this.getSheets()
    },
    methods: {
        // 获取推荐歌单
        getSheets: async function () {
            let result = this.$getStorage('musicRecommend')
            this.playlists = result ? result : (await this.$api.music.reqRecommend()).playlists
            this.$setStorage("musicRecommend", this.playlists)
        }
    }
}
</script>

<style lang='scss' scoped>
.BoxList {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 24px;
}
</style>