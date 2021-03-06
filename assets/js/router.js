
import Vue from 'vue';
import VueRouter from 'vue-router'
import Login from './components/pages/Login'
import Map from './components/pages/Map'
import Statement from './components/pages/Statement'
import Bonus from './components/pages/Bonus'
import store from './store/index'

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.IS_AUTHORIZED) {
        next();
        return;
    }
    next('/');
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.IS_AUTHORIZED) {
        next();
        return;
    }
    next('/login');
};

const routes = [
    {path: '/', component: Map, name: 'start', beforeEnter: ifAuthenticated,},
    {path: '/login', component: Login, name: 'login', beforeEnter: ifNotAuthenticated,},
    {path: '/statement', component: Statement, name: 'statement', beforeEnter: ifAuthenticated,},
    {path: '/map', component: Map, name: 'map', beforeEnter: ifAuthenticated,},
    {path: '/bonus', component: Bonus, name: 'bonus', beforeEnter: ifAuthenticated,}
];

export default new VueRouter({
    routes,
    path: '*',
    redirect: '/',
});


