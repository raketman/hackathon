
import Vue from 'vue';
import VueRouter from 'vue-router'
import Start from './components/pages/Start'
import Login from './components/pages/Login'
import Map from './components/pages/Map'
import Statement from './components/pages/Statement'
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
    {path: '/', component: Start, name: 'start', beforeEnter: ifAuthenticated,},
    {path: '/login', component: Login, name: 'login', beforeEnter: ifNotAuthenticated,},
    {path: '/statement', component: Statement, name: 'payment', beforeEnter: ifAuthenticated,},
    {path: '/map', component: Map, name: 'map', beforeEnter: ifAuthenticated,}
];

export default new VueRouter({
    routes,
    path: '*',
    redirect: '/',
});


