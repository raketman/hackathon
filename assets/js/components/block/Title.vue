<template>
    <div class="col a-center">
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

</style>