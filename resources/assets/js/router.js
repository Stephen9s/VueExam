import VueRouter from 'vue-router';
import ExampleComponent from './components/ExampleComponent.vue';

export default new VueRouter({
    routes: [
        {
            path: '/example',
            component: ExampleComponent
        }
    ]
});