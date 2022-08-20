import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: {
          isShow: true,
          title: '商品列表'
        },
        component: () => import('@/views/Goods.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import('@/views/User.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
