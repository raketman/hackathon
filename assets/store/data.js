import axios from "./axios";
import idTransformator from '../enums/id-to-code-list'
import Moment from 'moment'

export default {
    state: {
        number: window.localStorage.getItem('number'),
        user: null,
        objects: [],
        counters: []
    },
    getters: {
        USER: (state) => {
            return state.user;
        },
        OBJECTS: (state) => {
            return state.objects;
        },
        COUNTERS: (state) => {
            return state.counters;
        },
        COUNTERS_BY_OBJECT: (state) => {
            return object_id => state.counters[object_id] ? state.counters[object_id] : [];
        },
    },
    mutations: {
        CHANGE_DOC: (state) => {
            state.objects[0].values['title'] = 'ff';
        },

        SET_USER: (state, payload) => {
            state.user = payload;
        },
        RESET_USER: (state) => {
            state.user = null;
        },
        SET_OBJECTS: (state, payload) => {
            for(var i in payload) {
                payload[i].checked = 1;
            }
            state.objects = payload;
        },
        RESET_COUNTERS: (state) => {
            state.counters = [];
        },
        RESET_OBJECTS: (state) => {
            state.objects = [];
        },
        SET_COUNTERS: (state, payload) => {
            for(var i in payload.counters) {
                payload.counters[i]['object_id'] = payload.object_id;
                state.counters.push(payload.counters[i]);
            }
        },
        ADD_OBJECT: (state, payload) => {
            state.objects.push(payload);
        },
        ADD_COUNTER: (state, payload) => {
            state.counters.push(payload);
        },
        DELETE_OBJECT: (state, payload) => {
            state.objects = state.objects.filter(function ($item) {
                return $item.id !== payload;
            })
        },
        CHANGE_SELECTED_OBJECT: (state, payload) => {
            const index = state.objects.findIndex(el => {
                return el.id === payload.id;
            });
            if (index > -1) {
                state.objects[index].checked = state.objects[index].checked ? 0 : 1;
            }
        },
    },
    actions: {
        SET_USER: (context, payload) => {
            axios({
                method: 'get',
                url: '/proxy/api/v1/catalogs/12/records/'+payload,
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
        SET_OBJECTS: (context) => {
            let catalog = 11;
            //getCatalogInfo(catalog).then( (catalogInfo) => {
                return axios({
                    method: 'get',
                    url: '/proxy/api/v1/catalogs/' + catalog + '/records?timezoneOffset=180&filters[0][fieldId]=4&filters[0][value][0][recordId]=' + context.state.user.id + '&filters[0][value][0][catalogId]=12&sortField=id&sortType=-1&limit=100',
                })
                    .then((resp) => {
                        console.log(resp.data);

                        context.commit('SET_OBJECTS', parseByCatalog(resp.data, catalog, 1));
                    })
                    .catch(err => {
                        // eslint-disable-next-line
                        console.warn(err);
                    })
            //})

        },
        SET_COUNTERS: (context, objectId) => {
            let catalog = 13;

            return axios({
                method: 'get',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records?withFieldsAdditional=true&timezoneOffset=180&filters[0][fieldId]=12&filters[0][value][0][recordId]=' + objectId + '&filters[0][value][0][catalogId]=11&sortField=id&sortType=-1&limit=50'
                })
                .then((resp) => {
                    console.log(resp.data);

                    context.commit('SET_COUNTERS', {
                        object_id: objectId, counters: parseByCatalog(resp.data, catalog, 1)
                    });
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
        CREATE_PAYMENT: (context, payload) => {
            let catalog = 15;

            return axios({
                method: 'post',
                url: '/proxy/api/webrequest/pay',
                data: payload
            })
                .then((resp) => {
                    console.log(resp.data);
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
        ADD_OBJECT: (context, payload) => {
            let catalog = 11;
            let data = {
                4: [{
                    sectionId: "2",
                    catalogId: "12",
                    catalogTitle: "Владельцы",
                    recordId: context.state.user.id
                }],
                13: payload.account,
                14: payload.title,
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
                    
                    context.commit('ADD_OBJECT', parseByCatalog({
                        id: resp.data.id,
                        title: payload.title,
                        values: data
                    }, catalog));
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
        DELETE_OBJECT: (context, payload) => {

            let catalog = 11;

            // Уберем из владельцев юзера
            var newOwners = [];
            for(var i in payload.values['4']) {
                if (payload.values['4'][i]['recordId'] == context.state.user.id) {
                    continue;
                }
                newOwners.push(payload.values['4'][i]);
            }

            let data = {
                4: newOwners
            };

            return axios({
                method: 'patch',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records/' + payload.id + '?timezoneOffset=180',
                data: {
                    values: data
                }
            })
                .then((resp) => {
                    console.log(resp.data);

                    context.commit('DELETE_OBJECT', payload.id);
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
        ADD_COUNTER: (context, payload) => {
            let catalog = 13;
            let data = {
                8: payload.number,
                9: [payload.type],
                12: [{
                    sectionId: "2",
                    catalogId: "11",
                    catalogTitle: "Объекты",
                    recordId: payload.object_id
                }]
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

                    context.commit('ADD_COUNTER', parseByCatalog({
                        id: resp.data.id,
                        object_id: payload.object_id,
                        title: payload.number,
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



function getCatalogInfo(catalogId) {
    return axios({
        method: 'get',
        url: '/proxy/api/v1/catalogs/' + catalogId
    })
        .catch(err => {
            // eslint-disable-next-line
            console.warn(err);
        })

}

function parseByCatalog(data, catalog, isArray)
{
    if(isArray) {
        for(let i in data) {
            data[i] = parseByCatalog(data[i], catalog, 0);
        }
    } else {
        for (let j in data.values) {

            let code = idTransformator.getCode(j, catalog);
            if (!code) {
                continue;
            }

            data.values[code] = data.values[j];
        }
    }

    return data;
}
