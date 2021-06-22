import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/front/Home.vue'),
    children: [
      {
        path: '/products',
        name: 'Products',
        component: () => import('@/views/front/Products.vue'),
        meta: {
          title: '手感烘焙',
        },
      }, {
        path: '/product/:id',
        name: 'Product',
        component: () => import('@/views/front/Product.vue'),
      }, {
        path: '/checkorder',
        name: 'Checkorder',
        component: () => import('@/views/front/CheckOrder.vue'),
        meta: {
          title: '確認訂單',
        },
      }, {
        path: '/checkout/:id',
        name: 'Checkout',
        component: () => import('@/views/front/Checkout.vue'),
        meta: {
          title: '訂單結帳',
        },
      },
    ],
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/admin/Login.vue'),
    meta: {
      title: '登入',
    },
  }, {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/Dashboard.vue'),
    meta: {
      title: '後台管理',
    },
    children: [
      {
        path: 'products',
        component: () => import('@/views/admin/Products.vue'),
        meta: {
          title: '商品管理',
        },
      }, {
        path: 'orders',
        component: () => import('@/views/admin/Orders.vue'),
        meta: {
          title: '訂單管理',
        },
      }, {
        path: 'coupons',
        component: () => import('@/views/admin/Coupons.vue'),
        meta: {
          title: '優惠券管理',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: 'active',
  routes,
});

export default router;
