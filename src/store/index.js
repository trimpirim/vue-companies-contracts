import Vue from 'vue';
import Vuex from 'vuex';
import companies from '@/store/companies/store';
import contracts from '@/store/contracts/store';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  modules: {
    companies,
    contracts,
  },
});

export default store;
