import Vuex from 'vuex';
import Vue from "vue";
import Data from './data'
import Auth from './auth'
import Error from './error'
import Target from './target'

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        Data,
        Auth,
        Error,
        Target
    }
});