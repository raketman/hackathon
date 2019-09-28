<template>
   <div class="">
       <yandex-map class="map"
                   :settings="settings"
                   :controls="controls"
                   :coords="coords"
                   :zoom="zoom"
                   @map-was-initialized="initHandler"
       >
       </yandex-map>
       <!--<div id="yandex-map-ui" class="map"></div>-->
   </div>
</template>

<script>
    import { yandexMap } from 'vue-yandex-maps'

    export default {
        name: 'YandexMapUi',
        components: { yandexMap },
        data: () => ({
            coords: [55.80, 49.10],
            controls: [
                // 'geolocationControl', // мое местоположение
                // 'trafficControl', // пробки
            ],
            zoom: 13,
            settings: {
                apiKey: process.env.API_YANDEX_MAP_KEY,
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1',
            },

            userCoodinates: null,
            selectedPlacemark: null, // this.$store.getters.SELECTED,
            points: [
                [55.612360, 49.299670],
                [55.612138, 49.300547],
                [55.612500, 49.297044],
                [55.611354, 49.301347],
                [55.609873, 49.297310],
                [55.609825, 49.293998],
                [55.610584, 49.291835],
                [55.613922, 49.280004],
            ],
        }),
        methods: {
            initHandler(myMap) {
                this.hideCopyright();
                this.userLocation(myMap);
                let objects = this.addPoints(myMap);
                this.onPointClick(myMap, objects);

                /*
                userCircle.events.add('geometrychange', () => {
                    if (selectedPlacemark) {
                        const selectedObjects = window.ymaps.geoQuery([
                            userCircle,
                            selectedPlacemark
                        ]);
                        const objectsInsideCircle = selectedObjects.searchInside(userCircle);
                        window.console.dir(objectsInsideCircle);
                    }
                });
                */


/* Зачатки выбора типа маршрута (авто, общественный, пеший)
                autoRouteItem.events.add('click', function (e) { changeRoutingMode('auto', e.get('target')); });
                masstransitRouteItem.events.add('click', function (e) { changeRoutingMode('masstransit', e.get('target')); });
                pedestrianRouteItem.events.add('click', function (e) { changeRoutingMode('pedestrian', e.get('target')); });

                 function changeRoutingMode(routingMode, targetItem) {
                     multiRouteModel.setParams({ routingMode: routingMode }, true);

                     // Отменяем выбор элементов.
                     autoRouteItem.deselect();
                     masstransitRouteItem.deselect();
                     pedestrianRouteItem.deselect();

                     // Выбираем элемент и закрываем список.
                     targetItem.select();
                     routeTypeSelector.collapse();
                 }
*/
            },

            hideCopyright() {
                //region Прячем копирайт Яндекса (нарушая лицензионное соглашение)
                document.querySelector('.ymaps-2-1-74-copyrights-pane').style.display = 'none';
                //endregion
            },

            userLocation(myMap) {
                //region Вычесляем положение пользователя каждые 2 сек
                window.ymaps.geolocation
                    .get({
                        autoReverseGeocode : false, // отключить обратное геокодирование (тарифицируется)
                        mapStateAutoApply : true, // центруем и масштабируем автоматом
                    })
                    .then((result) => {
                        // меняем иконку (я) на свою
                        result.geoObjects.get(0).options.set(this.getUserPointStyle());
                        myMap.geoObjects.add(result.geoObjects);
                        // myMap.setCenter(userCoodinates, 16);

                        this.userCoodinates = result.geoObjects.get(0).geometry.getCoordinates();
                        // userCircle = new window.ymaps.Circle([userCoodinates, 10]);
                    })
                    .catch((err) => window.console.log('Ошибка: ' + err));
                setInterval(() => {
                    window.ymaps.geolocation
                        .get({
                            autoReverseGeocode : false, // отключить обратное геокодирование (тарифицируется)
                            mapStateAutoApply : true, // центруем и масштабируем автоматом
                        })
                        .then((result) => {
                            const coords = result.geoObjects.get(0).geometry.getCoordinates();
                            if (coords !== this.userCoodinates) {
                                this.userCoodinates = coords;
                            }
                        })
                        .catch((err) => window.console.log('Ошибка: ' + err));
                }, 2000);
                //endregion
            },

            addPoints(myMap) {
                /**
                 * Создание собственного макета с помощью фабрики макетов.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/templateLayoutFactory.xml
                 */
                const BalloonContentLayout = window.ymaps.templateLayoutFactory.createClass(
                    `<div class="my-balloon">
                        <a class="close" href="#">&times;</a>
                        Расстояние: <i>{{ properties.distance.text }}</i>,
                        <br />
                        Время в пути: <i>{{ properties.duration.text }}</i>
                    </div>`,
                    {
                        build: function () {
                            this.constructor.superclass.build.call(this);
                            /*
                            this._$element = $('.my-balloon', this.getParentElement());
                            this._$element.find('.close')
                                .on('click', $.proxy(this.onCloseClick, this));
                            */
                        },
                        onCloseClick: function (e) {
                            e.preventDefault();
                            this.events.fire('userclose');
                        }
                    }
                );

                //region Пункт сбора
                const pointStyle = {
                    /**
                     * Макет геообъекта.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml#param-options
                     */
                    balloonContentLayout: BalloonContentLayout,
                    // Отключаем режим панели для балуна.
                    balloonPanelMaxMapArea: 0,
                };
                const myCollection = new window.ymaps.GeoObjectCollection({}, null, Object.assign(
                    pointStyle,
                    this.getPointStyle()
                ));
                this.points.forEach(coords => myCollection.add(new window.ymaps.Placemark(coords)));
                const objects = window.ymaps.geoQuery(myCollection);

                // Найдем объекты, попадающие в видимую область и добавим на карту.
                objects.searchInside(myMap).addToMap(myMap);
                myMap.events.add('boundschange', () => {
                    if (this.selectedPlacemark) {
                        return;
                    }
                    const visibleObjects = objects.searchInside(myMap).addToMap(myMap);
                    objects.remove(visibleObjects).removeFromMap(myMap);
                });
                //endregion

                return objects;
            },

            addPrefix(style, prefix = 'icon') {
                const newStyle = {};
                for (let item in style) {
                    if (style.hasOwnProperty(item)) {
                        newStyle[prefix + item] = style[item];
                    }
                }
                return newStyle;
            },

            getPointStyle(prefix = 'icon') {
                // prefix = icon || wayPointFinish
                return this.addPrefix({
                    ImageSize : [ 20, 20 ],
                    ImageOffset : [ -10, -10 ],
                    Layout : 'default#image',
                    ImageHref : '/img/map-to.svg',
                }, prefix);
            },

            getUserPointStyle(prefix = 'icon') {
                // prefix = icon || wayPointStart
                return this.addPrefix({
                    ImageSize : [ 21, 31 ],
                    ImageOffset : [ -10, -15 ],
                    Layout : 'default#image',
                    ImageHref : '/img/map-me.svg',
                }, prefix);
            },

            onPointClick(myMap, objects) {
                //region Выбор пункта сбора
                let route = null;
                objects.each(placemark => {
                    placemark.events.add('click', (e) => {
                        // e.stopPropagation();
                        if (this.selectedPlacemark) {
                            return;
                        }

                        this.selectedPlacemark = e.get('target');
                        objects.remove(this.selectedPlacemark).removeFromMap(myMap);

                        const params = {
                            results: 1, // Максимальное число маршрутов
                            routingMode: 'pedestrian', // Тип маршрутизации: auto|masstransit|pedestrian|bicycle
                            boundsAutoApply: true, //
                            reverseGeocoding: false, //

                            // Внешний вид линии маршрута.
                            routeStrokeWidth: 4,
                            routeStrokeColor: '#000088',
                            routeActiveStrokeWidth: 4,
                            routeActiveStrokeColor: '#809CFF',

                            // Внешний вид линии пешеходного маршрута.
                            routeActivePedestrianSegmentStrokeStyle: 'solid',
                            routeActivePedestrianSegmentStrokeColor: '#809CFF',
                        };
                        const RouteModel = {
                            referencePoints: [ this.userCoodinates, e.get('coords'), ],
                            params: Object.assign(
                                params,
                                this.getPointStyle('wayPointFinish'),
                                this.getUserPointStyle('wayPointStart')
                            )
                        };
                        window.console.dir(RouteModel);
                        /**
                         * Создание мультимаршрута.
                         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
                         */
                        route = new window.ymaps.multiRouter.MultiRoute(RouteModel);
                        myMap.geoObjects.add(route);
                    });
                });
                //endregion
            },
        },
        mounted() {
        },
    }
</script>

<style scoped>
    .map{
        top: 64px;
        left: 0;
        z-index: 0;
        width: 100%;
        height: calc(100% - 64px);
        position: absolute;
    }
</style>
