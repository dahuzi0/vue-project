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
        }
      ]
    }
  ]
})
