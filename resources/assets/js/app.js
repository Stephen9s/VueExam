require('./bootstrap');
import Vue from 'vue';
Vue.config.devtools = true;
import VueRouter from 'vue-router';
import AppNavbarComponent from './components/AppNavbarComponent.vue';
import router from './router';
import store from './store'
window.Vue = Vue;
Vue.use(VueRouter);

// Create app
const app = new Vue({
    el: '#root',
    components: {
        'app-navbar': AppNavbarComponent
    },
    router,
    store
});