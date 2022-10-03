<template>
    <div id="NavBar">
        <div class="navbar__logo fs18">
            <div class="logo__text"><a href="/">CloudMusic</a></div>
            <div class="navbar__arrow">
                <i class="fa-pg fa fa-chevron-left" @click="$router.go(-1)"></i>
                <i class="fa-pg fa fa-chevron-right" @click="$router.go(1)"></i>
            </div>
        </div>
        <nav class="navbar__links fs18">
            <router-link to="/music">音乐</router-link>
            <router-link to="/videos">发现</router-link>
            <router-link to="/mine">音乐库</router-link>
        </nav>
        <div class="navbar__query__user">
            <div class="navbar__query">
                <el-input v-model="input" size="mini" prefix-icon="el-icon-search" placeholder="搜索" autocomplete="on"
                    clearable @keyup.13.native="toQuery"></el-input>
            </div>
            <div class="navbar__user">
                <div class="user__avatar" @click="showSelect = !showSelect">
                    <img src="@/assets/imgs/wy-logo.jpg" v-if="userInfo.avatar">
                    <img src="@/assets/imgs/avatar.png" v-else>
                </div>
                <div class="user__select fs16" v-show="showSelect"
                    :class="showSelect ? 'shutter-in-top' : 'shutter-out-top'">
                    <div class="select__item" @click="$router.push('/setting'),showSelect=false">
                        <i class="fa fa-cog"></i><span>设置</span>
                    </div>
                    <div class="select__item" v-if="userInfo" @click="$router.push('/login'),showSelect=false">
                        <i class="fa fa-sign-in"></i><span>登录</span>
                    </div>
                    <div class="select__item" v-else @click="userInfo && logout">
                        <i class="fa fa-sign-out"></i><span>退出</span>
                    </div>
                    <div class="select__item">
                        <i class="fa fa-github"></i><span><a href="https://github.com/Topskys/cloud-music"
                                target="_blank" @click="showSelect=false">Github</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "NavBar",
    data() {
        return {
            input: "",// 输入搜索
            showSelect: false,// 点击头像显示菜单
        }
    },
    computed: {
        ...mapGetters("m_user", ['userInfo'])
    },
    methods: {
        // 搜索回调
        // 配置路由：'/search'
        // 获取：this.$route.query.keywords
        toQuery: function () {
            this.input ? this.$router.push({
                path: '/search',
                query: {
                    keywords: this.input,
                }
            }) : this.$message.warning('搜索词不能为空')
        },
        // 退出回调
        logout: function () {
            
            this.$router.push('/')
            this.showSelect=false
        }
    }
}
</script>

<style lang='scss' scoped>



// 引入外部css样式
@import '@/assets/css/index.scss';

#NavBar {
    @include position($t: 0, $l: 0, $b: 0, $r: 0);
    @include flex($jc: space-between);
    @include padding($type: pg1, $tb: 0, $lr: 10vw);
    height: 64px;
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    background-color: var(--color-navbar-bg);
    z-index: 100;
    -webkit-app-region: drag;

    .navbar__logo {
        flex: 1;
        @include flex($jc: flex-start, $ai: center);

        .logo__text {
            font-weight: bold;
            letter-spacing: 1px;
            margin-right: 5vw;
        }

        .navbar__arrow {
            @include flex($jc: flex-start, $ai: center);

            i {
                font-size: 12px;
                margin: 2px;
                cursor: pointer;
            }
        }
    }

    .navbar__links {
        flex: 1;
        font-weight: 700;
        @include flex;
        -webkit-app-region: no-drag;
        -webkit-user-drag: none;

        a {
            border-radius: 6px;
            padding: 6px 10px;
            margin: 0 12px;
            transition: .2s;
            // transition: all .3s linear;

            &:hover {
                background:var(--color-secondary-bg-for-transparent);
            }

            &.router-link-exact-active {
                color: var(--color-primary);
                transform: scale(1.08);
            }
        }
    }

    .navbar__query__user {
        flex: 1;
        @include flex($jc: flex-end);

        // .navbar__query {}

        .navbar__user {
            position: relative;

            .user__avatar {
                width: 30px;
                margin-left: 12px;
                cursor: pointer;
                -webkit-app-region: no-drag;
                -webkit-user-drag: none;

                img {
                    border-radius: 50%;
                }
            }

            .user__select {
                @include position($t: 40px, $r: 0px);
                font-weight: bold;
                background-color: var(--color-body-bg);
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 0 5px #ddd;

                .select__item {
                    @include flex($jc: flex-start);
                    padding: 10px 15px;
                    border-radius: 5px;

                    i {
                        padding-right: 10px;
                    }

                    &:hover {
                        color: var(--color-primary);
                        background-color: whitesmoke;

                        a {
                            color: var(--color-primary);
                            background-color: whitesmoke;
                        }
                    }
                }
            }

            .shutter-in-top {
                animation-name: shutter-in-top;
                animation-duration: 1s;
                animation-timing-function: ease;
                animation-delay: 0s;
                animation-iteration-count: 1;
                animation-direction: normal;
                animation-fill-mode: none;
                /* shorthand animation: shutter-in-top 1s ease 0s 1 normal none; */
            }

            @keyframes shutter-in-top {
                0% {
                    transform: rotateX(-100deg);
                    transform-origin: top;
                    opacity: 0;
                }

                100% {
                    transform: rotateX(0deg);
                    transform-origin: top;
                    opacity: 1;
                }
            }

            .shutter-out-top {
                animation-name: shutter-out-top;
                animation-duration: 1s;
                animation-timing-function: ease;
                animation-delay: 1s;
                animation-iteration-count: 1;
                animation-direction: normal;
                animation-fill-mode: none;
                /* shorthand  animation: shutter-out-top 1s ease 0s 1 normal none; */
            }

            @keyframes shutter-out-top {
                0% {
                    transform: rotateX(0deg);
                    transform-origin: top;
                    opacity: 1;
                }

                100% {
                    transform: rotateX(70deg);
                    transform-origin: top;
                    opacity: 0;
                }
            }
        }
    }
}


@media(max-width:1336px) {
    #NavBar {
        @include padding($type: pg1, $tb: 0, $lr: 5vw);
    }
}
</style>