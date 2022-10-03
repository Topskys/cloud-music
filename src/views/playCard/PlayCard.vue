<template>
    <el-drawer title="" :visible.sync="showPlayCard" direction="btt" :before-close="handleClose" append-to-body
        :with-header="true" :modal="false" ref="drawer"
        :style="{ background: `url('${this.imgUrl}') center /cover no-repeat` }">
        <!-- :style="{ background: ` transparent url('${this.imgUrl}') center center no-repeat`, filter: `blur(0px)` }" -->
        <div class="playCard__container">
            <div class="playCard__body r-flex-6">
                <div class="rotate__play">
                    <div class="rotate__container">
                        <img src="@/assets/imgs/needle.png" class="rotate__needle"
                            :class="isPlay ? 'needle__start' : 'needle__stop'">
                        <div class="rotate__dish dish__start" :class="isPlay ? '' : 'dish__stop'">
                            <img src="@/assets/imgs/disc.png">
                            <img :src="imgUrl" v-if="imgUrl">
                            <img src="@/assets/imgs/wy-logo.jpg" v-else>
                        </div>
                    </div>
                    <div class="play__container">
                    </div>
                </div>
                <div class="turn__lyrics">
                    <!--  lyricIndex为当前歌曲播放的进度在歌词中的位置，进而改变正在播放的歌词的样式 -->
                    <ul class="lyric" ref="lyric">
                        <li :class="{ each: true, choose: (index == lyricIndex) }" v-for="(item, key, index) in lyric"
                            :key="index">{{  item  }}</li>
                    </ul>
                    <p v-show="!lyric">暂无歌词</p>
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import Icon from '@/components/icon'

export default {
    name: "PlayCard",
    props: ['id', 'imgUrl', 'currentTime'],
    data() {
        return {
            lyric: '',// 存储歌词
            lyricIndex: 0,
        }
    },
    components: {
        Icon,
    },
    computed: {
        ...mapState(['showPlayCard', 'isPlay']),
    },
    mounted() {
        this.getLyrics()
    },
    methods: {
        ...mapMutations(['updateShowPlayCard']),
        handleClose() {
            this.updateShowPlayCard(false)
        },
        // 获取当前播放歌曲的歌词
        async getLyrics() {
            if (!this.showPlayCard) return
            let { lrc: { lyric } } = await this.$api.music.reqLyrics(parseInt(this.id))
            // 处理歌词，转化成key为时间，value为歌词的对象
            let [lrcObj, lyricArr] = [{}, lyric.split('[').slice(1,)]; // 先以[进行分割
            lyricArr.forEach(item => {
                let arr = item.split(']');	// 再分割右括号
                // 时间换算成秒
                let m = parseInt(arr[0].split(':')[0])
                let s = parseInt(arr[0].split(':')[1])
                arr[0] = m * 60 + s;
                if (arr[1] != '\n') { // 去除歌词中的换行符
                    lrcObj[arr[0]] = arr[1];
                }
            })
            // 存储数据
            this.lyric = lrcObj
        }
    },
    watch: {
        'id': function () {
            this.getLyrics()
            this.showPlayCard && this.$refs.lyric.scrollTo({
                behavior: "smooth",
                top: 0,
            });
            // 给playCard添加背景图片方法二
            // this.$nextTick(() => {
            // this.$refs.drawer.$el.style.background = `url('${this.imgUrl}')`
            // })
        },
        'showPlayCard'() {
            this.getLyrics()
        },
        // 使用watch监听当前歌曲进度value的变化处理歌词位置
        'currentTime'() {
            if (!this.lyric) return
            let i = 0
            // 循环歌词对象
            for (let key in this.lyric) {
                // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
                if (+key == parseInt(this.currentTime)) {
                    this.lyricIndex = i;
                    // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
                    if (i > 5) {
                        this.$refs.lyric.scrollTop = 30 * (i - 5);
                    }
                }
                i++;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/index.scss';


::v-deep.el-drawer__wrapper {
    bottom: 66px !important;
    // background-size: cover !important;
}


::v-deep .el-drawer.btt {
    height: calc(100vh - 66px) !important;
    // backdrop-filter: blur(100px);
    // -webkit-backdrop-filter: blur(100px);
    // background: transparent;
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    background-color: var(--color-navbar-bg);
}


::v-deep .el-drawer__header {
    padding: 50px 10vw 0 10vw;
}



.playCard__container {
    padding: 30px 10vw;

    .close__icon {
        text-align: right;
        font-size: 24px;
    }

    .playCard__body {
        .rotate__play {
            .rotate__container {
                position: relative;
                padding-top: 80px;
                width: 260px;

                .rotate__needle {
                    @include position($t: 0, $l: 50%);
                    z-index: 100;
                    width: 120px;
                }

                .rotate__dish {

                    position: relative;
                    border-radius: 50%;
                    text-align: center;
                    height: 260px;
                    padding: 10px;
                    backdrop-filter: blur(10px);
                    background-color: var(--color-secondary-bg-for-transparent);
                    overflow: hidden;
                    box-shadow: 0px 0px 1px #ccc;

                    img:first-child {
                        z-index: 10;
                        border-radius: 50%;
                    }

                    img:last-child {
                        @include position($t: 50%, $l: 50%);
                        transform: translate(-50%, -50%);
                        border-radius: 50%;
                        padding: 45px;
                    }
                }

                .needle__start {
                    transform-origin: 0 0;
                    transition: transform .2s ease-in-out;
                    transform: rotate(25deg);
                }

                .dish__start {
                    -webkit-animation: rotate-dish 30s linear .5s infinite forwards;
                    animation: rotate-dish 30s linear .5s infinite forwards; // forwards：当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）
                }

                @keyframes rotate-dish {
                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }
                }

                .dish__stop {
                    animation-play-state: paused;
                }

                .needle__stop {
                    transform-origin: 0 0;
                    transition: transform .2s ease-in-out;
                    transform: rotate(0deg);
                }
            }
        }

        .turn__lyrics {
            flex: 1;
            padding: 0 5vw;
            @include flex($dir: column);

            .lyric {
                z-index: 999;
                list-style: none;
                min-width: 400px;
                max-height: 60vh;

                background-color: transparent;
                // 滚动条
                overflow-y: auto;
                color: var(--color-text);
                font-size: 16px;
                font-weight: normal;
                padding: 5px 10px;
                // border: 1px solid #000;
                border-left: none;

                .each {
                    // height: 30px;
                    line-height: 30px;
                    text-align: center;
                }

                .choose {
                    color: var(--color-primary);
                    // height: 30px;
                    line-height: 30px;
                    font-size: 20px;
                    font-weight: bold;
                }

                // 修改滚动条样式
                &::-webkit-scrollbar {
                    width: 3px;
                    height: 1px;
                }

                // 滑块部分
                &::-webkit-scrollbar-thumb {
                    background-color: transparent;
                }

                // 轨道部分
                &::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            }
        }
    }
}


@media screen and (max-width: 1336px) {
    .playCard__container {
        padding: 0 5vw;

    }

    ::v-deep .el-drawer__header {
        padding: 50px 5vw 0 5vw;
    }
}

@media screen and (min-width: 1336px) {
    .playCard__container>.playCard__body>.rotate__play>.rotate__container {

        padding-top: 110px;
        width: 360px;

        .rotate__needle {
            width: 160px;
        }

        .rotate__dish {
            height: 360px;

            img:last-child {
                padding: 60px;
            }
        }
    }
}
</style>