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
  /**
   * Loads all contracts by company
   *
   * @param state
   * @param commit
   * @param id
   * @returns {Promise<void>}
   */
  async loadAllByCompany({ state, commit }, id) {
    const { data, meta } = await loadAllByCompany(id, state.pagination);
    commit(MUTATION_TYPES.UPDATE_CONTRACTS_LIST, data);
    commit(MUTATION_TYPES.UPDATE_PAGINATION, meta);
  },
  ...paginationActions(MUTATION_TYPES),
  /**
   * Updates contract
   * @param dispatch
   * @param contract
   * @returns {Promise<void>}
   */
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
