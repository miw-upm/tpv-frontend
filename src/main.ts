import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {importProvidersFrom, provideZoneChangeDetection} from "@angular/core";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "./app/app.routes";
import {LogLevel, AuthModule, authInterceptor} from "angular-auth-oidc-client";


bootstrapApplication(AppComponent, {
        providers: [
            provideZoneChangeDetection({eventCoalescing: true}),
            provideAnimationsAsync(),
            provideHttpClient(),
            provideRouter(routes),
            provideHttpClient(withInterceptors([authInterceptor()])),
            importProvidersFrom(
                AuthModule.forRoot({
                    config: {
                        authority: 'http://localhost:8080/tpv-user',
                        redirectUrl: 'http://localhost:4200/callback',
                        postLogoutRedirectUri: 'http://localhost:4200',
                        clientId: 'spa-client-id',
                        scope: 'openid profile offline_access',
                        responseType: 'code',
                        silentRenew: true,
                        useRefreshToken: true,
                        secureRoutes: ['http://localhost:8080'],
                        logLevel: LogLevel.Debug,
                    }
                })
            )
        ]
    }).catch((err) => console.error(err));
