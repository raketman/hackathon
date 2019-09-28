import axios from "./axios";
import CatalogHelper from "../helper/catalog"
import Injection from "../helper/injection";
import moment from 'moment'

export default {
    state: {
        number: window.localStorage.getItem('number'),
        user: null,
        objects: []
    },
    getters: {
        USER: (state) => {
            return state.user;
        },
        OBJECTS: (state) => {
            return state.objects;
        }
    },
    mutations: {
        SET_USER: (state, payload) => {
            state.user = payload;
        },
        RESET_USER: (state) => {
            state.user = null;
        },

        SET_OBJECTS: (state, payload) => {
            state.objects = payload;
        },
        RESET_OBJECTS: (state) => {
            state.objects = [];
        },
        ADD_OBJECT: (state, payload) => {
            state.objects.push(payload);
        }
    },
    actions: {
        SET_USER: (context, payload) => {
            let catalog = CatalogHelper.getUserCatalog();

            axios({
                method: 'get',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records/'+payload,
            })
                .then((resp) => {
                    console.log(resp.data);

                    context.commit('SET_USER', resp.data);
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
        SET_USER_COORDS: (context, payload) => {
            let catalog = 13;

            let data = {
                5: payload.latitude,
                6: payload.longitude
            };

            return axios({
                method: 'put',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records/' + context.state.user.id + '?timezoneOffset=180',
                data: {
                    values: data
                }
            })
                .then((resp) => {
                    context.state.user.coords = payload;

                    context.commit('SET_USER', context.state.user);
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
        SET_OBJECTS: (context) => {
            let catalog = CatalogHelper.getObjectCatalog();
            return axios({
                method: 'get',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records?timezoneOffset=180&limit=100',
            })
                .then((resp) => {
                    console.log(resp.data);

                    context.commit('SET_OBJECTS', CatalogHelper.parseByCatalog(resp.data, catalog, 1));
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })
        },
        ADD_BONUS: (context, payload) => {
            let catalog = CatalogHelper.getBonusCatalog();
            let data = {
                7:  [Injection.getEvent(context.getters.GET_EVENT.id)],
                2: [Injection.getUser()],
                4: 1,
                3: moment().format('YYYY:MM DD HH:mm:ss'),
                6: 1
            };

            return axios({
                method: 'post',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records?timezoneOffset=180',
                data: {
                    values: data
                }
            })
                .then((resp) => {
                    console.log(resp.data);
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
    },
};


