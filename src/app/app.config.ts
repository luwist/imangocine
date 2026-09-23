import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideOptimus } from '@openng/optimus-ui/config';
import { CustomPresent } from './theme/theme';
import localeEsAR from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsAR);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideOptimus({
      theme: { preset: CustomPresent, options: { darkModeSelector: true } },
      ripple: true,
    }),
    { provide: LOCALE_ID, useValue: 'es-AR' },
  ],
};
