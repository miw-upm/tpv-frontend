import pkg from '../../package.json';

export const environment = {
    production: false,
    NAME: pkg.name,
    VERSION: pkg.version,
    REST_USER: 'http://localhost:8080/tpv-user',
    REST_CORE: 'http://localhost:8080/tpv-article'
};

