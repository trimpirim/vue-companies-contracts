// eslint-disable-next-line
export const INITIAL_PAGINATION_STATE = {
  total: 0,
  page: 0,
  perPage: 5,
  items: 0,
};

export const paginationGetters = {
  perPage: state => state.pagination.per_page,
};

export const paginationActions = mutationTypes => ({
    updatePaginationPage({ commit }, page) {
      commit(mutationTypes.UPDATE_PAGINATION_PAGE, page);
    },
  });

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
