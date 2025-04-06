import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {importProvidersFrom, provideZoneChangeDetection} from "@angular/core";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "./app/app.routes";
import {LogLevel, AuthModule} from "angular-auth-oidc-client";


bootstrapApplication(AppComponent, {
        providers: [
            provideZoneChangeDetection({eventCoalescing: true}),
            provideAnimationsAsync(),
            provideHttpClient(),
            provideRouter(routes),
            importProvidersFrom(
                AuthModule.forRoot({
                    config: {
                        authority: 'http://localhost:8081',
                        redirectUrl: window.location.origin + '/callback',
                        postLogoutRedirectUri: window.location.origin,
                        clientId: 'spa-client-id',
                        scope: 'openid profile',
                        responseType: 'code',
                        silentRenew: true,
                        useRefreshToken: true,
                        logLevel: LogLevel.Debug,
                    }
                })
            )
        ]
    }).catch((err) => console.error(err));
