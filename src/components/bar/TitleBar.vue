<template>
    <div class="TitleBar r-flex" >
        <div class="left">{{name}}</div>
        <div class="right">
            <router-link :to="path">查看全部</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name:'TitleBar',
    props: ['name','path'],
    
}
</script>

<style lang="scss" scoped>

.TitleBar{
    margin: 20px 0;
    justify-content: space-between;
    align-items: center;
    .left{
        font-size: 24px;
        font-weight: 600;
    }
    .right{
        color: #2c3e50;
        // font-weight: bold;
        &:hover{
            text-decoration: underline;
        }
    }
}
</style>