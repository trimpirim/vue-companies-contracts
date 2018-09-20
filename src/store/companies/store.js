// default state/initial state
import MUTATION_TYPES from '@/store/companies/constant';
import { loadAll } from '../../api/companies';

const INITIAL_STATE = {
  list: [],
  selected: null,
  pagination: {
    total: 0,
    page: 0,
    perPage: 0,
    items: 0,
  },
};

// exposed getters
const getters = {
  list: state => state.list,
  selected: state => state.selected,
};

const mutations = {
  [MUTATION_TYPES.UPDATE_COMPANIES_LIST](state, companies) {
    state.list = companies;
  },
  [MUTATION_TYPES.UPDATE_PAGINATION](state, meta) {
    state.pagination = meta;
  },
  [MUTATION_TYPES.SELECT_COMPANY](state, company) {
    state.selected = company;
  },
};

const actions = {
  select({ commit }, company) {
    commit(MUTATION_TYPES.SELECT_COMPANY, company);
  },
  async loadAll({ commit }) {
    const companies = await loadAll();
    commit(MUTATION_TYPES.UPDATE_COMPANIES_LIST, companies.data);
    commit(MUTATION_TYPES.UPDATE_PAGINATION, companies.meta);
  },
};

export default {
  namespaced: true,
  state: INITIAL_STATE,
  getters,
  mutations,
  actions,
};
