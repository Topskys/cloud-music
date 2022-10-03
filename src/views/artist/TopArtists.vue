<template>
    <div class="TopArtist">
        <TitleBar name='热门艺人' :path="`/searchMore?type=${100}`" /><!-- {path:'/path',query:{id:'123'}} :path=-->
        <!-- <div class='artist'>
            <Circles v-for='artist in artists' :key="artist.id" :circles='artist' :path="`/artist?id=${artist.id}`" />
        </div> -->
        <div class="artists__list grid">
            <div class="artist__item fs16 " v-for="art in artists" :key="art.id">
                <div class="artist__avatar">
                    <router-link to="#">
                        <img :src="$imgSize(art.picUrl, '512y512')">
                    </router-link>
                </div>
                <div class="artist__nickname">
                    <router-link to="#">{{  art.name  }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Circles from '@/components/item/Circles.vue'
import TitleBar from '@/components/bar/TitleBar.vue'
export default {
    name: 'TopArtist',
    data() {
        return {
            artists: [],
        }
    },
    components: {
        TitleBar,
        Circles,
    },
    created() {
        this.getTopArtist()
    },
    methods: {
        async getTopArtist() {
            let result = this.$getStorage('musicArtists')
            this.artists = result ? result : (await this.$api.music.reqTopArtist()).artists.slice(0, 6)
            this.artists && this.$setStorage("musicArtists", this.artists)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/index.scss';

.artists__list {
    grid-template-columns: repeat(6, 1fr);
    gap: 44px 24px;


    .artist__item {
        // width: 100%;
        font-weight: bold;

        .artist__avatar {
            text-align: center;

            img {
                width: 100%;
                aspect-ratio: 1/1;
                border-radius: 50%;
            }
        }

        .artist__nickname {
            width: 100%;
            line-height: 20px;
            word-break: break-all;
            text-align: center;
            padding: 10px 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;

            a:hover {
                text-decoration: underline;
            }
        }
    }

}
</style>