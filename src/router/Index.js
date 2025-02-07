import { createRouter, createWebHistory } from 'vue-router';
import Cart from '../views/Cart.vue';
import Data from '../views/Data.vue';

const routes = [
    {
        path: '/',
        name: 'data',
        component: Data
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    }
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;