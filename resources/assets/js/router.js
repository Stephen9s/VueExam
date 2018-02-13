import VueRouter from 'vue-router';
import ExamLoaderComponent from './components/ExamLoaderComponent.vue';
import ExamComponent from './components/ExamComponent.vue';

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: null
        },
        {
            path: '/load',
            component: ExamLoaderComponent
        },
        {
            path: '/exam/:examHash',
            component: ExamComponent,
            props: true
        }
    ]
});