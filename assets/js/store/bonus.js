import axios from "./axios";
import CatalogHelper from "../helper/catalog"
import Injection from "../helper/injection";
import moment from 'moment'

export default {
    state: {
        lastBonus: null,
        bonuses: []
    },
    getters: {
        BONUSES: (state) => {
            return state.bonuses.filter((item) => {
                return !state.lastBonus || item.id < state.lastBonus;
            });
        },
        BONUSES_NEW: (state) => {
            return state.bonuses.filter((item) => {
                return state.lastBonus && item.id >= state.lastBonus;
            });
        }
    },
    mutations: {
        RESET_BONUS_TIME: (state, payload) => {
            state.bonusTime = null;
        },
        INIT_LAST_BONUS: (state, payload) => {
            state.lastBonus = payload;
        },
        SET_BONUSES: (state, payload) => {
            state.bonuses = payload;
        },
        RESET_BONUSES: (state) => {
            state.bonuses = [];
        }
    },
    actions: {
        SET_BONUSES: (context, payload) => {
            let catalog = CatalogHelper.getBonusCatalog();

            axios({
                method: 'get',
                url: '/proxy/api/v1/catalogs/' + catalog + '/records?timezoneOffset=180&' + Injection.getUserFilter(0) + '&filters[1][fieldId]=6&filters[1][value][0]=1&sortField=id&sortType=-1&limit=500',
            })
                .then((resp) => {
                    console.log(resp.data);

                    context.commit('SET_BONUSES', CatalogHelper.parseByCatalog(resp.data, catalog, 1));
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.warn(err);
                })

        },
    },
};


