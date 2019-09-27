<template>
    <div class="row">
        <title-block title="Бонусы" />

        <div v-for="object in getObjects" :key="object.id" class="object-item">
            <div v-html="object.title"></div>
        </div>

    </div>
</template>

<script>
    import TitleBlock from '../block/Title'

    export default {
        name: 'Bonus',
        components: {
            TitleBlock
        },
        data: () => ({
            showMap: false
        }),
        computed: {
            getObjects() {
                return this.$store.getters.BONUSES;
            },
        },
        created() {
        },
        methods: {
            loadObject() {
                this.$store.commit('RESET_BONUSES');

                this.$store.dispatch('SET_BONUSES').then(() => {

                });
            },
        },
        mounted() {
            this.loadObject();
        },
    }
</script>
<style>
    .map{
        width: 100%;
        height: 300px;
    }
</style>
