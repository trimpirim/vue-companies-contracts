import { Contracts } from '../../services/resources';

const ContractsResource = new Contracts();

export const COMPANY_ID_FIELD = 'cid';

// eslint-disable-next-line
export const loadAllByCompany = (id, { page, perPage, orderBy }) => new Promise((resolve, reject) => {
  return ContractsResource
    .getBatch(COMPANY_ID_FIELD, [id], page, perPage, orderBy)
    .then(({ data, meta }) => {
      resolve({
        data: data.map(contract =>
          ({ ...contract, signedAt: contract.signed_at, validTill: contract.valid_till })),
        meta,
      });
    })
    .catch(err => reject(err));
});

export const updateContract = object => ContractsResource.update(object);
