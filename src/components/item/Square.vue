<template>
    <div class="Square">
        <div class="top" @click="goSheetDetail(square.id)"><img :src="square.coverImgUrl" :alt="square.id"><i
                class="fa fa-play pointer" @click='playSheet(square.id)'></i></div>
        <div class="down" @click="goSheetDetail(square.id)">{{ square.name }}</div>
    </div>
</template>

<script>
export default {
    name: 'Square',
    props: ['square'],
    data() {
        return {
            beforeSheetId: '', // 存储上一次歌单id
        }
    },
    methods: {
        // 判断歌单id是否与之前id相等
        isId(sheetId) {
            if (!sheetId || this.beforeSheetId == sheetId) {
                return;
            }
        },

        // 前往歌单详情的回调
        goSheetDetail(sheetId) {
            this.isId(sheetId)
            this.$router.push({
                path: '/sheet', query: {
                    id: sheetId,
                }
            })
            this.beforeSheetId = sheetId
        },


        // 播放按钮的回调
        playSheet(sheetId) {
            this.isId(sheetId)
            // this.$store.commit()
        },
    }
}
</script>

<style lang="scss" scoped>

.Square {
    // max-width: 100%;
    border-radius: 10px;
height:100%;

    .top {
        // 父级相对定位
        position: relative;
        border-radius: 10px;
        transition: all .3s linear;

        &:hover {
            color: white;
            transform: scale(1.0);
            /* 盒子阴影 */
            box-shadow: 4px 20px 40px 5px rgba(0, 0, 0, .1);
        }

        img {
            // display: block;
            width: 100%;

            // min-height: 180px;
            // max-height: 25rem;
            background-position: center;
            background-size: cover;
            border-radius: 10px;
        }

        .fa {
            // 绝对定位
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 20px;
            padding: 10px 10px 10px 15px;
            border-radius: 100px;
            display: none;
            background-color: rgba(0, 0, 0, 0.5);
        }

        &:hover {
            .fa {
                display: block;
            }
            z-index: 500;
            box-shadow: 0 2px 10px 0 grey;
        }
    }

    .down {
        width: 100%;
        // 多行超出文本出现省略号的效果
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin: 10px 0;
        color: black;
        font-weight: 600;

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }
}

@media screen and (max-width:1200px){
    .top>img {
            min-height: 180px;
            max-height: 25rem;
    }
}
@media screen and (min-width:1200px){
    .top>img {
            min-height: 215px;
            max-height: 25rem;
    }
}
</style>