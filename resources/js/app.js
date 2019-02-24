require('./bootstrap');
import Vue from 'vue';
Vue.config.devtools = true;
import VueRouter from 'vue-router';
import AppNavbarComponent from './components/AppNavbarComponent.vue';
import router from './router';
import store from './store';
window.Vue = Vue;
import VueSweetalert2 from 'vue-sweetalert2'; 
Vue.use(VueSweetalert2);
Vue.use(VueRouter);
import Vuetify from 'vuetify';
Vue.use(Vuetify);

Vue.directive('json-formatted',
    function (el, binding) {
        try {
            let j = JSON.parse(binding.value);
            el.value = JSON.stringify(j, undefined, 4);
        } catch(err) {}
    }
);
window.store = store;
// Create app
const app = new Vue({
    el: '#app',
    router,
    store,
    data: () => ({
        drawer: true,
        applicationName: 'Vue Exam'
    })
});