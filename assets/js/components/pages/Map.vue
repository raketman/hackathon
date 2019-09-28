<template>
    <div class="row">
        <title-block title="Карта" />
        <yandex-map-ui v-if="showMap" class="map"></yandex-map-ui>
    </div>
</template>

<script>
    import YandexMapUi from '../ui/YandexMapUi';
    import TitleBlock from '../block/Title'

    export default {
        name: 'Map',
        components: {
            YandexMapUi, TitleBlock
        },
        data: () => ({
            showMap: false
        }),
        computed: {
            getObjects() {
                return this.$store.getters.OBJECTS;
            },
        },
        methods: {
            selectObject(object) {
                this.$store.commit('SET_TARGET', object);
            },
            loadObject() {
                this.$store.commit('RESET_OBJECTS');

                this.$store.dispatch('SET_OBJECTS').then(() => {

                });
            },
        },
        created() {
        },
        mounted() {
            this.showMap = true;
            this.loadObject();
        },
    }
</script>

<style scoped>
    .map{
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>
