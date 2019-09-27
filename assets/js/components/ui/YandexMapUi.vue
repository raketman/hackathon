<template>
   <div class="">
       <yandex-map class="map"
                   :settings="settings"
                   :controls="controls"
                   :coords="coords"
                   :zoom="zoom"
                   @map-was-initialized="initHandler"
       >
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
            controls: [
                'geolocationControl', // мое местоположение
                'trafficControl', // пробки
            ],
            zoom: 13,
            settings: {
                apiKey: process.env.API_YANDEX_MAP_KEY,
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1',
            },
        }),
        methods: {
            initHandler(myMap) {
                /*
                 let points = [
                 [55.612360, 49.299670],
                 [55.612138, 49.300547],
                 [55.612500, 49.297044],
                 [55.611354, 49.301347],
                 [55.609873, 49.297310],
                 [55.609825, 49.293998],
                 [55.610584, 49.291835],
                 [55.613922, 49.280004],
                 ];
                 */


                navigator.geolocation.getCurrentPosition( (position) => {
                    myMap.setCoords = [position.coords.latitude, position.coords.longitude];
                    myMap.setZoom(17);
                });
            },
        },
        mounted() {
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
