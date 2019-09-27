
import Vue from 'vue';
import VueRouter from 'vue-router'
import Objects from './components/pages/Objects'
import Second from './components/pages/Second'
import Login from './components/pages/Login'
import Payment from './components/pages/Payment'
import Map from './components/pages/Map'
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
    {path: '/', component: Objects, name: 'start', beforeEnter: ifAuthenticated,},
    {path: '/check', component: Second, name: 'second', beforeEnter: ifAuthenticated,},
    {path: '/login', component: Login, name: 'login', beforeEnter: ifNotAuthenticated,},
    {path: '/payment', component: Payment, name: 'payment', beforeEnter: ifAuthenticated,},
    {path: '/map', component: Map, name: 'map', beforeEnter: ifAuthenticated,}
];

export default new VueRouter({
    routes,
    path: '*',
    redirect: '/',
});


