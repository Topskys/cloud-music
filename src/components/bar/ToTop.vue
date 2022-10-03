<template>
    <!-- 使用注意：滚动的盒子必须有个固定的高度，且设有 overflow-y:scroll; 否则会出现scrollTop=0的情况 -->
    <div class="ToTop" :class="isGoTopShow ? 'showBtn' : isFirstLoad ? '' : 'hideBtn'" @click="goTop">
        <i class="fa fa-arrow-up"></i>
    </div>
</template>

<script>
let obj;

export default {
    name: "ToTop",
    props: {
        // 滚动对象的选择器
        scrollObj: {
            type: String,
            default() {
                return "";
            },
        },
    },
    data() {
        return {
            // 是否显示改组件
            isGoTopShow: false,
            // 是否是第一次加载  第一次加载组件不需要添加hideBtn类
            isFirstLoad: false,
        };
    },
    methods: {
        goTop() {
            this.el.scrollTo({
                behavior: "smooth",
                top: 0,
            });
        },
    },
    mounted() {
        if (this.scrollObj == "") {
            obj = document;
            this.el = document.documentElement;
        } else {
            obj = document.querySelector(this.scrollObj);
            this.el = obj;
        }

        obj.onscroll = (e) => {
            if (this.el.scrollTop >= 500 && this.isGoTopShow == false) {
                this.isGoTopShow = true;
                this.isFirstLoad ? (this.isFirstLoad = false) : "";
            } else if (this.el.scrollTop < 500 && this.isGoTopShow) {
                this.isGoTopShow = false;
            }
        };
    },
};
</script>

<style scoped>




.ToTop {
    position: fixed;
    background-color: #f8f8f8;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 999;
    cursor: pointer;
    bottom: -50px;
    right: 40px;
}

.showBtn {
    animation: showBtn 0.7s ease;
    animation-fill-mode: forwards;
}

.hideBtn {
    animation: hideBtn 0.3s ease-in;
    animation-fill-mode: forwards;
}

.GoTop i {
    font-size: 16px;
    color: #888;
}

.GoTop:hover {
    box-shadow: 0 20px 25px -8px rgba(0, 0, 0, 0.1),
        0 10px 10px -8px rgba(0, 0, 0, 0.04);
}

@keyframes showBtn {
    0% {
        bottom: -50px;
        opacity: 0;
    }

    50% {
        bottom: 110px;
        opacity: .5;
    }

    100% {
        bottom: 85px;
        opacity: 1;
    }
}

@keyframes hideBtn {
    from {
        bottom: 85px;
        opacity: 1;
    }

    to {
        bottom: -50px;
        opacity: 0;
    }
}
</style>
