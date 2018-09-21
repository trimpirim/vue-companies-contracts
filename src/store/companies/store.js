// default state/initial state
import MUTATION_TYPES from '@/store/companies/constant';
import { loadAll } from '@/api/companies';
import { INITIAL_PAGINATION_STATE, paginationGetters, paginationActions, paginationMutations } from '@/utils/pagination';

const INITIAL_STATE = {
  list: [],
  selected: null,
  pagination: INITIAL_PAGINATION_STATE,
};

// exposed getters
const getters = {
  list: state => state.list,
  selected: state => state.selected,
  ...paginationGetters,
};

const mutations = {
  [MUTATION_TYPES.UPDATE_COMPANIES_LIST](state, companies) {
    state.list = companies;
  },
  [MUTATION_TYPES.SELECT_COMPANY](state, company) {
    state.selected = company;
  },
  ...paginationMutations(MUTATION_TYPES),
};

const actions = {
  select({ commit }, company) {
    commit(MUTATION_TYPES.SELECT_COMPANY, company);
  },
  ...paginationActions(MUTATION_TYPES),
  async loadAll({ state, commit }) {
    const { data, meta } = await loadAll(state.pagination);
    commit(MUTATION_TYPES.UPDATE_COMPANIES_LIST, data);
    commit(MUTATION_TYPES.UPDATE_PAGINATION, meta);
  },
};

export default {
  namespaced: true,
  state: INITIAL_STATE,
  getters,
  mutations,
  actions,
};
