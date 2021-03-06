import { Contracts } from '../../services/resources';

const ContractsResource = new Contracts();

export const SELER_COMPANY_ID_FIELD = 'sid';

/**
 * Loads and parses all contracts by company.
 * @param id
 * @param page
 * @param perPage
 * @param orderBy
 * @returns {Promise<any>}
 */
// eslint-disable-next-line
export const loadAllBySellerCompany = (id, {page, perPage, orderBy}) => new Promise((resolve, reject) => {
  return ContractsResource
    .getBatch(SELER_COMPANY_ID_FIELD, [id], page, perPage, orderBy)
    .then(({ data, meta }) => {
      resolve({
        data: data.map(contract =>
          ({ ...contract, signedAt: contract.signed_at, validTill: contract.valid_till })),
        meta,
      });
    })
    .catch(err => reject(err));
});

/**
 * Updates contract object
 * @param object
 * @returns {Promise}
 */
export const updateContract = object => ContractsResource.update(object);
