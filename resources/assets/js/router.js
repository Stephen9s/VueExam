import VueRouter from 'vue-router';
import ExampleComponent from './components/ExampleComponent.vue';
import ExamLoaderComponent from './components/ExamLoaderComponent.vue';

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: null
        },
        {
            path: '/load',
            component: ExamLoaderComponent
        }
    ]
});