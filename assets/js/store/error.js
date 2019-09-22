export default {
    state: {
        error: null
    },
    getters: {
        GET_ERROR: (state) => {
            return state.error;
        }
    },
    mutations: {
        ADD_ERROR: (state, payload) => {
            state.error = payload;
        },
        FLUSH_ERROR: (state) => {
            state.error = null;
        }
    }
};