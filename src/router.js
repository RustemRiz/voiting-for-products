import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Products from './views/Products.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            component: Products
        }
    ]
})

export default router;