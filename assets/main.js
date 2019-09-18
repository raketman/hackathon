import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import moment from 'moment';
import { sync } from 'vuex-router-sync';

Vue.config.productionTip = false;

require('moment/locale/ru.js');
Vue.use(require('vue-moment'), {
  moment,
});
Vue.config.productionTip = false;

/**
 * слушаем router
 */
sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
