<template>
    <div class="icon">
        <i :class="icon | filterIcon"></i>
    </div>
</template>

<script>
export default {
    name: "icon",
    props: {
        icon: {
            type: String,
            default: ""
        }
    },
    filters: {
        filterIcon: (icon) => `fa fa-${icon}`
    },
}
</script>

<style lang="scss" scoped>
.icon {
    display: inline-block;
    color: var(--color-text);
    padding: 10px;
    border-radius: 10px;
    transition: all .3s linear;

    &:hover {
        background-color: var(--color-secondary-bg-for-transparent);
        transform: scale(0.9);
    }
}
</style>