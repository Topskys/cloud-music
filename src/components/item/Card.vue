<template>
    <div class="Card">
        <div class="card__img__container">
            <img :src="$imgSize(img,'512y512')">
            <i class="fa fa-play"></i>
        </div>
        <div class="card__description fs16 text-overflow">{{desc}}</div>
    </div>
</template>

<script>
import Icon from '@/components/icon'
export default {
    name: "Card",
    props: {
        img:{
            type: String,
            default: "",
        },
        desc:{
            type: String,
            default: "description",
        },
        url:{
            type: String,
            default: "/",
        },
        showIcon:{
            type: Boolean,
            default: true,
        }
    },
    components: {
        Icon
    },
}
</script>

<style lang="scss" scoped>



.Card {
    .card__img__container {
        position: relative;
        transition: all .3s linear;
        img{
            width: 100%;
                aspect-ratio: 1/1;
        }
        i{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
            color:#fff;
            border-radius: 50%;
        }
        &:hover{
            transform: scale(1.05);
            // box-shadow: 0 0 3px #ccc;
            i{
                display: block;
                background-color: var(--color-secondary-bg-for-transparent);
            }
        }
    }
    .card__description {
        margin: 10px 0;
        color: var(--color-text);
        line-height: 1.2;
        font-weight: 600;
        word-break: break-all;
        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    }
}
</style>