import { Companies } from '../../services/resources';

const CompaniesResource = new Companies();

export const loadAll = () => CompaniesResource.list();
export const test = () => 'test';
