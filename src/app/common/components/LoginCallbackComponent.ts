import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "@core/services/auth.service";
import {OAuthService} from "angular-oauth2-oidc";
import {JsonPipe} from "@angular/common";


@Component({
    selector: 'app-login-callback',
    template: `<p>Autenticando...{{ claims|json }}</p>`,
    imports: [
        JsonPipe
    ]
})
export class LoginCallbackComponent implements OnInit {
    claims: Record<string, any>;

    constructor(private readonly oauthService: OAuthService, private readonly auth: AuthService, private readonly router: Router) {
    }

    ngOnInit(): void {
        this.oauthService.events.subscribe(event => {
            if (event.type === 'token_received' || event.type === 'token_refreshed') {
                console.log("se dispara el evento: " + event.type);
                const identityClaims = this.oauthService.getIdentityClaims();
                console.log(JSON.stringify(identityClaims));
                this.claims = identityClaims;
                if (this.auth.untilOperator()) {
                    this.router.navigate(['shop']).then();
                } else {
                    this.router.navigate(['home']).then();
                }
            }
        })

    }

}