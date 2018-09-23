import MUTATION_TYPES from '@/store/contracts/constant';
import { loadAllBySellerCompany, updateContract } from '@/api/contracts';
import { loadAllByIds } from '@/api/companies';
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
  [MUTATION_TYPES.ADD_SELLER_COMPANY](state, company) {
    state.list = state.list.map(contract => ({
        ...contract,
        seller: company,
      }));
  },
  [MUTATION_TYPES.ADD_CLIENT_COMPANIES](state, companies) {
    state.list = state.list.map((contract) => {
      const client = companies.find(company => contract.cid === company.id);
      return {
        ...contract,
        client,
      };
    });
  },
  ...paginationMutations(MUTATION_TYPES),
};

const actions = {
  reset({ commit }) {
    commit(MUTATION_TYPES.UPDATE_CONTRACTS_LIST, []);
    commit(MUTATION_TYPES.UPDATE_PAGINATION, INITIAL_PAGINATION_STATE);
  },
  /**
   * Loads all contracts by company
   *
   * @param state
   * @param commit
   * @param company
   * @returns {Promise<void>}
   */
  async loadAllByCompany({ state, commit }, company) {
    const { data, meta } = await loadAllBySellerCompany(company.id, state.pagination);
    const {
      data: companies,
    } = await loadAllByIds(data.map(contract => contract.cid), INITIAL_PAGINATION_STATE);
    commit(MUTATION_TYPES.UPDATE_CONTRACTS_LIST, data);
    commit(MUTATION_TYPES.ADD_SELLER_COMPANY, company);
    commit(MUTATION_TYPES.ADD_CLIENT_COMPANIES, companies);
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
    dispatch('loadAllByCompany', contract.seller);
  },
};

export default {
  namespaced: true,
  state: INITIAL_STATE,
  getters,
  mutations,
  actions,
};
