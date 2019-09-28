import axios from "./axios";
import Catalog from "../helper/catalog"
import moment from 'moment'
import Injection from '../helper/injection'

export default {
    state: {
        target_id: window.localStorage.getItem('target_id'),
        target: null,
        event: null
    },
    getters: {
        IS_TARGET: (state) => {
            let target = state.target;

            if (!target) {
                return false;
            }

            return true;
        },
        GET_TARGET: (state) => {
            return state.target;
        },
        GET_EVENT: (state) => {
            return state.event;
        }
    },
    mutations: {
        SET_TARGET: (state, payload) => {
            state.target = payload;
            state.target_id = payload.id;
            window.localStorage.setItem('target_id', payload.id);
        },
        RESET_TARGET: (state) => {
            state.target = null;
            state.event = null;
            window.localStorage.removeItem('target_id');
        },
        SET_EVENT: (state, payload) => {
            state.event = payload;
        },
    },
    actions: {
        INIT_TARGET: (context, payload) => {
            let catalog = Catalog.getObjectCatalog();

            if (!context.state.target_id) {
                return
            }

            return axios({
                method: 'get',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records/'+context.state.target_id,
            })
                .then((resp) => {
                    console.log(resp.data);

                    context.commit('SET_TARGET', Catalog.parseByCatalog(resp.data, catalog));
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
        CHECK_EVENT: (context, payload) => {
            let catalog = Catalog.getObjectEventCatalog();

            if (!context.state.target_id || !context.state.event) {
                return
            }

            return axios({
                method: 'get',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records/'+context.state.event.id,
            })
                .then((resp) => {
                    console.log(resp.data);

                    context.commit('SET_EVENT', Catalog.parseByCatalog(resp.data, catalog));
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },

        APPROVED_EVENT: (context, payload) => {
            let catalog = Catalog.getObjectEventCatalog();

            if (!context.state.target_id || !context.state.event) {
                return
            }

            let data = {
                4: ["2"]
            };

            return axios({
                method: 'put',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records/'+context.state.event.id,
                data: {
                    values: data
                }
            })
                .then((resp) => {
                    console.log(resp.data);

                    context.state.event.values.status = data[4];
                    context.commit('SET_EVENT', context.state.event);
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },

        ADD_EVENT: (context, payload) => {
            // context.commit('SET_EVENT', {id: 2, values: {status: 1}});
            // return;


            let catalog = Catalog.getObjectEventCatalog();
            let data = {
                2:  [{
                    sectionId: Catalog.getStorageSection(),
                    catalogId: Catalog.getObjectCatalog(),
                    catalogTitle: "Точки сбора",
                    recordId: context.state.target_id
                }],
                3: [Injection.getUser()],
                4: ["1"],
                5: moment().format('YYYY:MM DD HH:mm:ss')
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

                    context.commit('SET_EVENT', Catalog.parseByCatalog({
                        id: resp.data.id,
                        title: '',
                        values: data
                    }, catalog));
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
    },
};
