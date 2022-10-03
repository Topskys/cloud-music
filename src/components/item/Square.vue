<template>
    <div class="Square">
        <div class="top" @click="toSheetDetail(square.id)">
            <img :src="$imgSize(square.coverImgUrl, '512y512') " :alt="square.id">
            <i class="fa fa-play pointer" @click='playSheet(square.id)'></i>
        </div>
        <div class="down" @click="toSheetDetail(square.id)">{{ square.name }}</div>
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
        // 前往歌单详情的回调
        toSheetDetail(sheetId) {
            sheetId && this.$router.push({
                path: '/sheet', query: {
                    id: sheetId,
                }
            })
        },
        // 播放按钮的回调
        playSheet(){},
    }
}
</script>

<style lang="scss" scoped>


.Square {
    // max-width: 100%;
    border-radius: 10px;
    height: 100%;

    .top {
        // 父级相对定位
        position: relative;
        border-radius: 10px;
        transition: all .3s linear;

        

        img {
            // display: block;
            // width: 100%;
            // height: 100%;
            // min-height: 180px;
            // // max-height: 25rem;
            // background-position: center;
            // background-size: cover;
            width: 100%;
                aspect-ratio: 1/1;
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
            z-index: 10; 
            display: none;
            background-color: var(--color-secondary-bg-for-transparent);
            backdrop-filter: blur(1rem);
        }

        &:hover {
            .fa {
                display: block;
            }

            box-shadow: 2px 3px 3px 0 #ccc;
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

@media screen and (max-width:1200px) {
    .top>img {
        // min-height: 180px;
        // max-height: 25rem;
    }
}

@media screen and (min-width:1200px) {
    .top>img {
        // min-height: 215px;
        // max-height: 25rem;
    }
}
</style>