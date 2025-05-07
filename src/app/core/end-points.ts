import {environment} from '@env';

export class EndPoints {
    static readonly USERS = environment.REST_USER + '/users';
    static readonly PROVIDERS = environment.REST_ARTICLE + '/providers';
    static readonly ARTICLES = environment.REST_ARTICLE + '/articles';
    static readonly CASHIERS = environment.REST_ARTICLE + '/cashiers';
    static readonly CASHIERS_LAST = EndPoints.CASHIERS + '/last';
    static readonly TICKETS = environment.REST_ARTICLE + '/tickets';
    static readonly COMPLAINTS = environment.REST_ARTICLE + '/complaints';
}
