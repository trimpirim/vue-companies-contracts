import { Companies } from '../../services/resources';

const CompaniesResource = new Companies();

/**
 * Loads all sorted and paginated companies
 *
 * @param page
 * @param perPage
 * @param orderBy
 * @returns {Promise}
 */
// eslint-disable-next-line
export const loadAll = ({
                          page,
                          perPage,
                          orderBy,
                        }) => CompaniesResource.list(page, perPage, orderBy);
