import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../page/login/login.vue'], resolve)   //
    },
    {
      path: '/',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [
        {
          path: '/index',
          component: resolve => require(['../page/index.vue'], resolve)   //
        },
        {
          path: '/video',
          component: resolve => require(['../page/video/video.vue'], resolve)   //
        },
        {
          path: '/pic',
          component: resolve => require(['../page/pic/pic.vue'], resolve)   //
        },
        {
          path: '/text',
          component: resolve => require(['../page/text/text.vue'], resolve)   //
        },
        {
          path: '/map',
          component: resolve => require(['../page/map/map.vue'], resolve)   //
        }
      ]
    }
  ]
})
