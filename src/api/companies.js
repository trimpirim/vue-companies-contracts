import { Companies } from '../../services/resources';

const CompaniesResource = new Companies();

const COMPANY_ID_FIELD = 'id';

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
/**
 * Filters out companies by an array of ids
 *
 * @param ids
 * @param page
 * @param perPage
 * @param orderBy
 * @returns {Promise<any>}
 */
export const loadAllByIds = (ids, {
  page,
  perPage,
  orderBy,
}) => new Promise((resolve, reject) => CompaniesResource
  .getBatch(COMPANY_ID_FIELD, ids, page, perPage, orderBy)
  .then(({ data, meta }) => {
    resolve({
      data: data.map(contract =>
        ({ ...contract, signedAt: contract.signed_at, validTill: contract.valid_till })),
      meta,
    });
  })
  .catch(err => reject(err)));
