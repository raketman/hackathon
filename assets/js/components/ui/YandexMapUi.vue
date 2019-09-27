<template>
   <div class="">
       <yandex-map :settings="settings" :coords="coords" :zoom="zoom" class="map">
           <ymap-marker
                   :coords="coords"
                   marker-id="123"
                   hint-content="some hint"
           />
       </yandex-map>
       <div id="yandex-map-ui" class="map"></div>
   </div>
</template>

<script>
    import { yandexMap, ymapMarker } from 'vue-yandex-maps'

    export default {
        name: 'YandexMapUi',
        components: { yandexMap, ymapMarker },
        data: () => ({
            coords: [55.80, 49.10],
            zoom: 9,
            markerIcon: {
                layout: 'default#imageWithContent',
                imageHref: 'https://image.flaticon.com/icons/png/512/33/33447.png',
                imageSize: [43, 43],
                imageOffset: [0, 0],
                content: '123 v12',
                contentOffset: [0, 15]
            },
            settings: {
                apiKey: process.env.API_YANDEX_MAP_KEY,
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1'
            }
        }),
        created() {
            navigator.geolocation.getCurrentPosition( (position) => {
                this.coords = [position.coords.latitude, position.coords.longitude];
            });
            // ymaps.ready(function(){
            //     var map = new ymaps.Map("yandex-map-ui", {
            //         center: [55.76, 37.64],
            //         zoom: 7
            //     });
            // });
        },
        mounted() {
        },
    }
</script>

<style scoped>
    .map{
        width: 100%;
        height: 300px;
    }
</style>
