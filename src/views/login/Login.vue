<!--
 * @Author: Topskys
 * @Date: 2022-08-30 20:13:46
 * @LastEditTime: 2022-08-31 13:17:30
 * @LastEditors: Topskys
 * @Description: 
-->
/*
 * @Author: Topskys
 * @Date: 2022-08-30 20:13:46
 * @LastEditTime: 2022-08-30 20:33:21
 * @LastEditors: Topskys
 * @Description: 
 */
<template>
    <div class="login">
        <div class="login__container">
            <div class="scan__login">
                <div class="netease__logo"><img src="@/assets/imgs/netease-music.png"></div>
                <p class="fs24 color0">登录网易云账号</p>
                <div class="scan__img">
                    <img :src="qrImg">
                </div>
                <div class="scan__prompt">{{  prompt  }}</div>
                <div class="scan__links">
                    <router-link to="#">邮箱登录</router-link>|
                    <router-link to="#">手机号登录</router-link>
                </div>
            </div>
            <div class="emil__login"></div>
            <div class="phone__login"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            userInfo: "",
            key: '',// 二维码的key
            qrImg: null,// 二维码
            prompt: "打开网易云音乐App扫码登录",// 提示文本
        }
    },
    mounted() {
        this.login()
    },
    methods: {
        login: async function () {
            let timer = null;
            this.getLoginStatus();
            const key = this.getQRKey();
            this.getQRUrl();
            timer = setInterval(async () => {
                const res = await this.checkStatus(key)
                // const code = res.code
                // if (code === 800) {
                //     this.prompt = res.message
                //     clearInterval(timer);
                // }
                // if (code === 801) {
                //     this.prompt = res.message
                // }
                // if (code === 803) {
                //     clearInterval(timer);
                //     this.prompt = res.message
                //     await this.getLoginStatus()
                // }
            }, 10000)
        },
        getLoginStatus: async function () {
            const res = await this.$api.mine.reqLoginStatus()
            window.sessionStorage.setItem("currentUser", JSON.stringify(res.data, null, 2))
        },
        getQRKey: async function () {
            const res = await this.$api.mine.reqQRKey()
            return res.data.unikey
        },
        getQRUrl: async function () {
            const res = await this.$api.mine.reqQRImg(this.key)
            this.qrImg = res.data.qrimg
        },
        checkStatus: async function (key) {
            return await this.$api.mine.reqCheckStatus(key)
        },



        // async checkStatus(key) {
        //     const res = await axios({
        //         url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
        //         withCredentials: true, //关键
        //     })
        //     return res.data
        // },
        // async getLoginStatus() {
        //     const res = await axios({
        //         url: `/login/status?timerstamp=${Date.now()}`,
        //         withCredentials: true, //关键
        //     })
        //     document.querySelector('#info').innerText = JSON.stringify(res.data, null, 2)
        // },
        // async login() {
        //     let timer
        //     let timestamp = Date.now()
        //     this.getLoginStatus()
        //     const res = await axios({
        //         url: `/login/qr/key?timerstamp=${Date.now()}`,
        //         withCredentials: true, //关键
        //     })
        //     const key = res.data.data.unikey
        //     const res2 = await axios({
        //         url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`,
        //         withCredentials: true, //关键
        //     })
        //     document.querySelector('#qrImg').src = res2.data.data.qrimg

        //     timer = setInterval(async () => {
        //         const statusRes = await this.checkStatus(key)
        //         if (statusRes.code === 800) {
        //             alert('二维码已过期,请重新获取')
        //             clearInterval(timer)
        //         }
        //         if (statusRes.code === 803) {
        //             // 这一步会返回cookie
        //             clearInterval(timer)
        //             alert('授权登录成功')
        //             await this.getLoginStatus()
        //         }
        //     }, 3000)
        // }


    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/index.scss';

.login {
    .login__container {
        .scan__login {
            @include flex($dir: column);

            .netease__logo {
                margin: 40px;

                img {
                    width: 64px;
                    height: 64px;
                }
            }

            p {
                margin-bottom: 48px;
                font-weight: bold;
            }

            .scan__img {
                width: 240px;
                padding: 24px 24px 21px;
                border-radius: 1.25rem;
                margin-bottom: 12px;
                background-color: var(--color-primary-bg);
            }

            .scan__prompt {
                color: var(--color-text);
                text-align: center;
                margin-bottom: 28px;
            }

            .scan__links {
                margin-top: 24px;
                font-size: 13px;
                color: var(--color-text);
                opacity: .68;

                a {
                    padding: 0 8px;
                }
            }
        }
    }
}
</style>