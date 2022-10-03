<template>
    <div class="TitleBar r-flex">
        <div class="left fs24 fw600">{{ name }}</div>
        <div class="right">
            <router-link :to="path">查看全部</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TitleBar',
    props: ['name', 'path'],

}
</script>

<style lang="scss" scoped>
.TitleBar {
    margin: 20px 0;
    justify-content: space-between;
    align-items: center;
    letter-spacing: 1px;

    .right:hover {
        text-decoration: underline;
    }
}
</style>