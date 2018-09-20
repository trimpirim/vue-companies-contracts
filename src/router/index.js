import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/containers/Home/Home';
import Companies from '@/containers/Companies/Companies';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/companies',
      name: 'Companies',
      component: Companies,
    },
  ],
});
