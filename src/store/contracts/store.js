import MUTATION_TYPES from '@/store/contracts/constant';
import { loadAllByCompany, updateContract } from '@/api/contracts';
import { INITIAL_PAGINATION_STATE, paginationActions, paginationMutations } from '@/utils/pagination';

const INITIAL_STATE = {
  list: [],
  pagination: INITIAL_PAGINATION_STATE,
};

// exposed getters
const getters = {
  list: state => state.list,
};

const mutations = {
  [MUTATION_TYPES.UPDATE_CONTRACTS_LIST](state, contracts) {
    state.list = contracts;
  },
  [MUTATION_TYPES.UPDATE_CONTRACTS_LIST](state, contracts) {
    state.list = contracts;
  },
  ...paginationMutations(MUTATION_TYPES),
};

const actions = {
  async loadAllByCompany({ state, commit }, id) {
    const { data, meta } = await loadAllByCompany(id, state.pagination);
    commit(MUTATION_TYPES.UPDATE_CONTRACTS_LIST, data);
    commit(MUTATION_TYPES.UPDATE_PAGINATION, meta);
  },
  ...paginationActions(MUTATION_TYPES),
  async updateContract({ dispatch }, contract) {
    await updateContract(contract);
    dispatch('loadAllByCompany', contract.cid);
  },
};

export default {
  namespaced: true,
  state: INITIAL_STATE,
  getters,
  mutations,
  actions,
};
