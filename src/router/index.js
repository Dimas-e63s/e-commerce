import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'shop',
    component: () => import('../views/Shop.vue'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/Product.vue'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      layout: 'admin',
      auth: true
    },
    children: [
      {path: 'products',
       name: 'products',
        component: () => import('../views/Admin/Products.vue'),
      },
      {path: 'categories',
       name: 'categories',
        component: () => import('../views/Admin/Categories.vue'),
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, _, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  if(!isAuthenticated && to.meta.auth) {
    next({name: 'auth'})
  } else {
    next()
  }
})

export default router
