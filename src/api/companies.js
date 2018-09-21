import { Companies } from '../../services/resources';

const CompaniesResource = new Companies();

export const loadAll = ({
                          page,
                          perPage,
                          orderBy,
}) => CompaniesResource.list(page, perPage, orderBy);
export const test = () => 'test';
