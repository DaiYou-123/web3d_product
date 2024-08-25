import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// 懒加载路由
const HomeView = () => import("../views/index.vue");
const Website = () => import("../views/vue_Website.vue");
const MacRoom = () => import("../views/vue_macRoom.vue");
const GS3D = () => import("../views/vue_3DGS.vue");


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
      // children: [
      //   {
      //     path: '/website',
      //     name: 'Website',
      //     component: Website,
      //     meta: {
      //       title: '3D网站'
      //     }

      //   }
      //   ],

    },
    {
      path: '/website',
      name: 'Website',
      component: Website,
      meta: {
        title: '3D网站'
      }
    },
    {
      path: '/macRoom',
      name: 'MacRoom',
      component: MacRoom,
      meta: {
        title: '机房'
      }
    },
    {
      path: '/3DGS',
      name: 'GS3D',
      component: GS3D,
      meta: {
        title: '3D高斯'
      }
    },

  ]
})

export default router
