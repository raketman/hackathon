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
        },
        created() {
        },
        mounted() {
            this.showMap = true;
        }
    }
</script>
<style>
    .map{
        width: 100%;
        height: 300px;
    }
</style>
