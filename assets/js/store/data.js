import axios from "./axios";
import CatalogHelper from "../helper/catalog"

export default {
    state: {
        number: window.localStorage.getItem('number'),
        selectedPoint: window.localStorage.getItem('selectedPoint'),
        user: null,
        objects: []
    },
    getters: {
        USER: (state) => {
            return state.user;
        },
        OBJECTS: (state) => {
            return state.objects;
        },
        SELECTED: (state) => {
            return state.selectedPoint;
        },
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
                    window.console.log(resp.data);

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
                .then(() => {
                    context.state.user.coords = payload;

                    context.commit('SET_USER', context.state.user);
                })
                .catch(err => {
                    // eslint-disable-next-line
                    window.console.warn(err);
                })

        },
        SET_OBJECTS: (context) => {
            let catalog = CatalogHelper.getObjectCatalog();
            return axios({
                method: 'get',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records?timezoneOffset=180&limit=100',
            })
                .then((resp) => {
                    window.console.log(resp.data);

                    context.commit('SET_OBJECTS', CatalogHelper.parseByCatalog(resp.data, catalog, 1));
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })
        }
    },
};


