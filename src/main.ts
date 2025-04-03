import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {AuthConfig, OAuthModule, OAuthService} from "angular-oauth2-oidc";
import {importProvidersFrom, provideZoneChangeDetection} from "@angular/core";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "./app/app.routes";

export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/tpv-user',
    redirectUri: window.location.origin, // http://localhost:4200
    clientId: 'spa-client-id',
    responseType: 'code',
    scope: 'admin manager operator customer',
    showDebugInformation: true,
};

(async () => {
    const appRef = await bootstrapApplication(AppComponent, {
        providers: [
            provideZoneChangeDetection({eventCoalescing: true}),
            provideAnimationsAsync(),
            provideHttpClient(),
            importProvidersFrom(OAuthModule.forRoot({
                    resourceServer: {
                        allowedUrls: ['http://localhost'], // URLs a las que se añade el token
                        sendAccessToken: true
                    }
                }
            )),
            provideRouter(routes)
        ]
    });

    // Obtiene el servicio de OAuth desde el inyector de la aplicación
    const injector = appRef.injector;
    const oauthService = injector.get(OAuthService);

    // Configura y carga el documento de descubrimiento, intentando el login
    oauthService.configure(authConfig);
    await oauthService.loadDiscoveryDocumentAndTryLogin();
})();
