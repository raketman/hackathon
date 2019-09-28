<template>
   <div class="map-wrp flex-column">
       <yandex-map v-if="loadMap" class="map"
                   :settings="settings"
                   :controls="controls"
                   :coords="coords"
                   :zoom="zoom"
                   @map-was-initialized="initHandler"
       >
       </yandex-map>

       <div style="bottom: 0px;position: absolute">
         <neighbors-containers
                 :inArea="inArea"
         ></neighbors-containers>
       </div>
   </div>
</template>

<script>
    import { yandexMap } from 'vue-yandex-maps'
    import NeighborsContainers from '../observers/NeighborsContainers';
    import IntervalStore from '../../helper/intervals'

    export default {
        name: 'YandexMapUi',
        components: { yandexMap, NeighborsContainers },
        data: () => ({
            placemarkToPointId: {},
            firstIndicator: true,
            pointInArea: false,
            loadMap: false,
            coords: [55.80, 49.10],
            controls: [
                'zoomControl',
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

            me: null,
            map: null,
            route: null,
            selectedPlacemark: null, // this.$store.getters.SELECTED,
            points: []
        }),
        computed: {
            inArea() {
                return this.pointInArea;
            },
            getObjects() {
                var points = [];
                for (let key in this.$store.getters.OBJECTS) {
                    if (this.$store.getters.OBJECTS.hasOwnProperty(key)) {
                        var point = this.$store.getters.OBJECTS[ key ];

                        point.coords = [ point.values.latitude, point.values.longitude ];

                        points.push(point);
                    }
                }
                return points;
            }
        },
        methods: {
            initHandler(myMap) {
                IntervalStore.stop('map');

                this.map = myMap;
                this.hideCopyright();
                this.userLocation();
                this.addPoints();
                this.subscribeEvent();

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
            userLocation() {
                //region Вычесляем положение пользователя каждые 2 сек
                var internal = setInterval(() => {
                    window.ymaps.geolocation
                        .get({
                            autoReverseGeocode : false, // отключить обратное геокодирование (тарифицируется)
                            mapStateAutoApply : true, // центруем и масштабируем автоматом
                        })
                        .then((result) => {
                            const coords = result.geoObjects.get(0).geometry.getCoordinates();
                            if (this.me) {
                                const circle = new window.ymaps.Circle([coords, 30000], null, {visible: false});
                                this.map.geoObjects.add(circle);
                                const objects = window.ymaps.geoQuery(this.me);
                                const moveCheck = objects.searchInside(circle);

                                moveCheck.then(() => {
                                    if (this.firstIndicator || !moveCheck.getLength()) {
                                        this.firstIndicator = false;
                                        window.console.log('Идем...');
                                        this.me.get(0).geometry.setCoordinates(coords);

                                        if (this.$store.getters.IS_TARGET &&  this.route) {
                                            this.route.model.setReferencePoints([
                                                coords,
                                                this.selectedPlacemark
                                            ]);

                                            const objects = window.ymaps.geoQuery(this.selectedPlacemark);
                                            const objectsInsideCircle = objects.searchInside(circle);
                                            objectsInsideCircle.then(() => {
                                                if (objectsInsideCircle.getLength()) {
                                                    window.console.log('Дошли!');
                                                    objectsInsideCircle.setOptions('preset', 'islands#redIcon');
                                                    this.pointInArea = true;
                                                } else {
                                                    window.console.log('Но еще не дошли =(');
                                                    this.pointInArea = false;
                                                }
                                            });
                                        }
                                    } else {
                                        window.console.log('Стоим на месте =\'(');
                                    }
                                });
                            } else {
                                // меняем иконку (я) на свою
                                result.geoObjects.get(0).options.set(this.getUserPointStyle());
                                this.me = result.geoObjects;
                                this.map.geoObjects.add(this.me);
                            }
                        })
                        //.catch((err) => window.console.log('Ошибка: ' + err));
                }, 2000);

                IntervalStore.save('map', internal);
                //endregion
            },
            subscribeEvent() {
                // Подпишемся на получения выбранной точки
                this.$store.subscribe( (mutation, state) => {
                    if (this.selectedPlacemark || !this.map) {
                        return;
                    }
                    if (mutation.type !== 'SET_TARGET') {
                        return;
                    }

                    // Выберем нужную
                    this.selectPoint(this.placemarkToPointId[this.$store.getters.GET_TARGET.id]);
                });

                // Подпишемся на получения выбранной точки
                this.$store.subscribe( (mutation, state) => {
                    if (mutation.type !== 'RESET_TARGET') {
                        return;
                    }

                    // Выберем нужную
                    this.resetMap();

                    // Поставим точки обртано
                    this.addPoints();
                });
            },
            addPoints() {
                //region Пункт сбора
                const myCollection = new window.ymaps.GeoObjectCollection();
                this.getObjects.forEach(point => {
                    const placemark = new window.ymaps.Placemark(point.coords, null,
                        //this.getPointStyle()
                        this.merge(this.getPointStyle(), this.getBaloonStyle())
                    );
                    placemark.events.add('click', (e) => {
                        this.selectPoint(placemark);

                        // Зафиксируем точку
                        this.$store.commit('SET_TARGET', point);
                    });
                    myCollection.add(placemark);

                    this.placemarkToPointId[point.id] = placemark;
                });

                this.map.geoObjects.add(myCollection);

                if (this.$store.getters.IS_TARGET) {
                    // Выберем нужную
                    this.selectPoint(this.placemarkToPointId[this.$store.getters.GET_TARGET.id]);
                }

            },
            resetMap() {
                this.selectedPlacemark = null;
                this.map.geoObjects.removeAll();
            },
            selectPoint(placemark) {
                if (this.selectedPlacemark) {
                    return;
                }

                const referencePoints = [
                    placemark.coords,//this.me.get(0).geometry.getCoordinates(),
                    placemark.coords,
                ];
                this.selectedPlacemark = placemark;
                this.firstIndicator = true;

                this.map.geoObjects.removeAll();
                this.createRoute(referencePoints);
            },
            createRoute(referencePoints) {
                const RouteModel = {
                    referencePoints: referencePoints,
                    params: this.merge(
                        this.merge(
                            this.getPointStyle('wayPointFinishIcon'),
                            this.getUserPointStyle('wayPointStartIcon')
                        ),
                        {
                            results: 1, // Максимальное число маршрутов
                            routingMode: 'pedestrian', // Тип маршрутизации: auto|masstransit|pedestrian|bicycle
                            boundsAutoApply: true, //
                            reverseGeocoding: false, //

                            // Внешний вид линии маршрута.
                            routeStrokeWidth: 3,
                            routeStrokeColor: '#000088',
                            routeActiveStrokeWidth: 4,
                            routeActiveStrokeColor: '#809CFF',

                            // Внешний вид линии пешеходного маршрута.
                            routeActivePedestrianSegmentStrokeStyle: 'solid',
                            routeActivePedestrianSegmentStrokeColor: '#809CFF',
                        }
                    ),
                };
                /**
                 * Создание мультимаршрута.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
                 */
                this.route = new window.ymaps.multiRouter.MultiRoute(RouteModel);
                this.map.geoObjects.add(this.route);
                /*
                this.route.events.add('boundschange', () => {
                    this.map.setBounds(this.route.getBounds(), {
                        checkZoomRange: true,
                    });
                });
                */
            },

            merge(object1, object2) {
                const newObject = object1;
                for (let item in object2) {
                    if (object2.hasOwnProperty(item)) {
                        newObject[item] = object2[item];
                    }
                }
                return newObject;
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
            getUserPointStyle(prefix = 'icon') {
                // prefix = icon || wayPointStartIcon
                return this.addPrefix({
                    ImageSize :   [ 21, 31 ],
                    ImageOffset : [ -10, -15 ],
                    Layout :      'default#image',
                    ImageHref :   '/img/map-me.svg',
                }, prefix);
            },
            getPointStyle(prefix = 'icon') {
                // prefix = icon || wayPointFinishIcon
                return this.addPrefix({
                    ImageSize :   [ 20, 20 ],
                    ImageOffset : [ -10, -10 ],
                    Layout :      'default#image',
                    ImageHref :   '/img/map-to.svg',
                }, prefix);
            },
            getBaloonStyle() {
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
                                 // this._$element = $('.my-balloon', this.getParentElement());
                                 // this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
                         },
                         onCloseClick: function (e) {
                             e.preventDefault();
                             this.events.fire('userclose');
                         }
                     }
                 );

                return {
                    /**
                     * Макет геообъекта.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml#param-options
                     */
                     balloonContentLayout: BalloonContentLayout,
                     // Отключаем режим панели для балуна.
                     balloonPanelMaxMapArea: 0,
                }
            },
        },
        created() {
            window.ymaps.ready(() => {
                this.loadMap = true;
                // window.ymaps.geolocation.get({
                //     autoReverseGeocode: false, // отключить обратное геокодирование (тарифицируется)
                // }).then(function (res) {
                //     this.coords = res.geoObjects.get(0).geometry.getCoordinates();
                // });
            });
        },
        mounted() {
        },
    }
</script>

<style scoped>
    .map-wrp {
        flex: auto;
    }
    .map {
        flex: auto;
        width: 100%;
    }
</style>
