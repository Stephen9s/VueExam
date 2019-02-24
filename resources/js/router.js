import VueRouter from 'vue-router';
import ExamLoaderComponent from './components/ExamLoaderComponent.vue';
import ExamComponent from './components/ExamComponent.vue';
import ExamsComponent from './components/ExamsComponent.vue';

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/load'
        },
        {
            path: '/load',
            component: ExamLoaderComponent
        },
        {
            path: '/exams',
            component: ExamsComponent
        },
        {
            path: '/exam/:examHash',
            component: ExamComponent,
            props: true
        }
    ]
});