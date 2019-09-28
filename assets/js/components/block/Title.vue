<template>
    <div class="col a-center top-block">
        <!-- todo: Стрелка на зад!
        <back v-if="true" />
        -->
        <h3 class="title col">{{ title }}</h3>
        <logout v-if="this.$store.getters.IS_AUTHORIZED" />
    </div>
</template>

<script>
    import Logout from './Logout';

    export default {
        name: "Title",
        components: {
            Logout,
        },
        props: [
            'title',
        ],
    }
</script>

<style scoped>
    .top-block {
        flex: 0 0 64px;
        padding: 0 5px;
        background: #7B1EF5;
    }
    .top-block .title {
        padding: 0 15px;
    }
</style>