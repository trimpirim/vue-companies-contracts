import Vue from 'vue';
import Vuex from 'vuex';
import companies from '@/store/companies/store';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  modules: {
    companies,
  },
});

export default store;
