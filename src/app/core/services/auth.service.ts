import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Role} from '@core/models/role.model';
import {OAuthService} from "angular-oauth2-oidc";


@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private readonly oauthService: OAuthService, private readonly router: Router) {
    }

    login(): void {
        console.log('Login pulsado...');
        this.oauthService.initLoginFlow();
    }

    logout(): void {
        this.oauthService.logOut();
        console.log('Logout pulsado...' + this.isAuthenticated());
    }

    isAuthenticated(): boolean {
        return this.oauthService.hasValidAccessToken();
    }

    hasRoles(roles: Role[]): boolean {
        const claims = this.oauthService.getIdentityClaims();
        const rolesToken = claims ? claims['roles'] : null;
       return this.isAuthenticated() && roles.includes(Role[rolesToken.toUpperCase() as keyof typeof Role]);
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
        const claims = this.oauthService.getIdentityClaims();
        return claims ? claims['sub'] : null;
    }

    getName(): string {
        const claims = this.oauthService.getIdentityClaims();
        return claims ? claims['name'] : null;
    }

}
