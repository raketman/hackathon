import axios from "./axios";
import Catalog from "../helper/catalog"

export default {
    state: {
        target_id: window.localStorage.getItem('target_id'),
        target: null
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
        }
    },
    mutations: {
        SET_TARGET: (state, payload) => {
            state.target = payload;
            window.localStorage.setItem('target_id', payload.id);
        },
        RESET_TARGET: (state) => {
            state.target = null;
            window.localStorage.removeItem('target_id');
        }
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

        }
    },
};
