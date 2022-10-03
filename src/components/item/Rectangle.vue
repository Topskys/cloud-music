
<template>
    <div class="Rectangle">
        <div class="top" @click="goPlay(rectangle.id || rectangle.vid, rectangle.type)"><img
                :src="$imgSize(rectangle.coverUrl || rectangle.cover, '512y512')"
                :alt="rectangle.id || rectangle.vid"><i class="fa fa-play pointer"
                @click='goPlay(rectangle.id || rectangle.vid, rectangle.type)'></i></div>
        <div class="down" @click="goPlay(rectangle.id || rectangle.vid, rectangle.type)">{{  rectangle.title ||
        rectangle.name
 }}</div>
    </div>
</template>

<script>
export default {
    name: "Rectangle",
    props: ['rectangle'],//
    data() {
        return {
            beforeId: '', // 存储上一次id
        }
    },
    methods: {
        // 判断id是否与之前id相等
        isId(id) {
            if (!id || this.beforeId == id) {
                return;
            }
        },
        // 前往歌单详情的回调
        goPlay(id, type) {
            this.isId(id)
            this.$router.push({
                path: '/vmv', query: {
                    id: id,
                    type: type,
                }
            })
            this.beforeId = id
        },
    }
}
</script>

<style lang='scss' scoped>
.Rectangle {
    // min-width: 8.125rem;
    // max-width: 15.625rem;
    // max-width: 100%;

    border-radius: 10px;

    .top {
        // 父级相对定位
        position: relative;
        border-radius: 10px;
        transition: all .2s linear;

        &:hover {
            color: white;
            // background-color:#335eea;
            transform: scale(1.07);
            /* 盒子阴影 */
            box-shadow: 4px 20px 40px 5px rgba(0, 0, 0, .1);
        }

        img {
            // display: block;
            // width: 100%;
            // min-height: 120px;
            //     max-height: 130px;
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
</style>