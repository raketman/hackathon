import axios from "./axios";
import Catalog from "../helper/catalog"

export default {
    state: {
        access_token: window.localStorage.getItem('access_token')
    },
    getters: {
        IS_AUTHORIZED: (state) => {
            let token = state.access_token;

            if (!token) {
                return false;
            }

            return true;
        },
        GET_TOKEN: (state) => {
            return state.access_token;
        }
    },
    mutations: {
        AUTHORIZED: (state, payload) => {
            state.access_token = payload.id;
            window.localStorage.setItem('access_token', payload.id);
        },
        LOGOUT: (state) => {
            state.access_token = null;
            window.localStorage.removeItem('access_token');
        }
    },
    actions: {
        LOGOUT: (context, payload) => {
            return new Promise((resolve, reject) => { resolve()})
                .then((resp) => {
                    context.commit('LOGOUT');
                    context.commit('RESET_USER')
                    context.commit('RESET_TARGET')
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
        AUTHORIZED: (context, payload) => {

            return axios({
                method: 'get',
                url: '/proxy/api/v1/catalogs/' + Catalog.getUserCatalog() + '/records?filters[0][fieldId]=' + Catalog.getUserLoginField() + '&filters[0][value]='+payload.replace('+7','').replace(' (', '').replace(') ', '').replace(' ', '').replace('-', '').replace('-', ''),
            })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
    },
};
