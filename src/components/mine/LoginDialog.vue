<template>
    <div class="LoginDialog">
        <el-dialog :visible.sync="loginDialogVisible" :append-to-body="true">
            <div class="login-box" align='center'>
                <p class="fs24 fw600 mg20-0">登录网易云账号</p>
                <div class="scan-img pg25 bg1 br20">
                    <img :src="qrImg" style="width:100%;height:100%;" v-if="qrImg">
                    <i class="fa fa-refresh fs18" v-else></i>
                </div>
                <div class="text mg10-0">{{text}}</div>
            </div>
        </el-dialog>

        <!-- append-to-body: Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true -->
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'LoginDialog',
    data() {
        return {
            loginDialogVisible: true,
            key:'',// 二维码的key
            qrImg:null,// 二维码
            text:"打开网易云音乐App扫码登录",// 提示文本
        }
    },
    computed: {
        ...mapState(['isLogin',]),
    },
    mounted() {
        this.login()
    },
    methods: { 
        login:async function() {
            let timer=null;
            let timestamp=Date.now()
            this.getLoginStatus();
            const key=this.getQRKey();
            this.getQRUrl();
            timer=setInterval(async ()=>{
                const res =await this.checkStatus(key)
                const code=res.data.code
                console.log("keysss",this.code)
                if(code===800){
                    this.text ="二维码已过期,请重新获取"
                    clearInterval(timer);
                }
                if (code === 801) {
                    this.text = "登台扫码"
                }
                if(code===803){
                    clearInterval(timer);
                    this.text = "授权登录成功";
                    await this.getLoginStatus()
                }
            },10000)
        },
        
        getLoginStatus: async function() {
            const res = await this.$api.mine.reqLoginStatus()
            window.sessionStorage.setItem("currentUser",JSON.stringify(res.data,null,2))
            console.log("getLoginState", res)

        },
        getQRKey:async function() {
            const res = await this.$api.mine.reqQRKey()
            return res.data.unikey
        },
        getQRUrl:async function() {
            const res = await this.$api.mine.reqQRImg(this.key)
            this.qrImg = res.data.qrimg
        },
        checkStatus:async function (key) {
            console.log("ss",key)
            const res = await this.$api.mine.reqCheckStatus(key)
            return res
        },
    }

}
</script>

<style lang='scss' scoped>



.scan-img {
    width: 15.625rem;
    height: 15.625rem;
    position:relative;
    .fa-refresh{
        position:absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%, -50%);
    }
}

</style>