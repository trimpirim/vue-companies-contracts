/**
 * This file is fully reused in other places. I do not want to have a global state of pagination,
 * because in that case, I might have to find an approach, where I could have multiple paginations
 * in one state.
 */

// eslint-disable-next-line
export const INITIAL_PAGINATION_STATE = {
  total: 0,
  page: 0,
  perPage: 5,
  items: 0,
};

/**
 * All the getters of pagination state
 * @type {{perPage: (function(*): number)}}
 */
export const paginationGetters = {
  perPage: state => state.pagination.per_page,
};

/**
 * All the actions of pagination state
 * @param mutationTypes
 * @returns {{updatePaginationPage({commit: *}, *=): void}}
 */
export const paginationActions = mutationTypes => ({
  updatePaginationPage({ commit }, page) {
    commit(mutationTypes.UPDATE_PAGINATION_PAGE, page);
  },
});

/**
 * All the mutations of pagination state
 * @param mutationTypes
 * @returns {{}}
 */
export const paginationMutations = mutationTypes => ({
  [mutationTypes.UPDATE_PAGINATION](state, meta) {
    state.pagination = {
      ...meta,
      perPage: meta.per_page,
    };
  },
  [mutationTypes.UPDATE_PAGINATION_PAGE](state, page) {
    state.pagination.page = page;
  },
});
