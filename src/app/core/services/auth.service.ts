import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Role} from '@core/models/role.model';
import {OAuthService} from "angular-oauth2-oidc";


@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private readonly oauthService: OAuthService, private readonly router: Router) {
    }

    login(): void {
        this.oauthService.initLoginFlow();
    }

    logout(): void {
        this.oauthService.logOut();
        this.router.navigate(['']).then();
    }

    isAuthenticated(): boolean {
        return this.oauthService.hasValidAccessToken();
    }

    hasRoles(roles: Role[]): boolean {
        return this.isAuthenticated(); //TODO...
    }

    isAdmin(): boolean {
        return this.hasRoles([Role.ADMIN]);
    }

    untilManager(): boolean {
        return this.hasRoles([Role.ADMIN, Role.MANAGER]);
    }

    untilOperator(): boolean {
        return this.hasRoles([Role.ADMIN, Role.MANAGER, Role.OPERATOR]);
    }

    isCustomer(): boolean {
        return this.hasRoles([Role.CUSTOMER]);
    }

    getMobile(): number {
        return 0; //TODO...
    }

    getName(): string {
        return "???"; //TODO...
    }

    getToken(): string {
        return this.oauthService.getAccessToken();
    }

}
