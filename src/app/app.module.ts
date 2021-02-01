import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CountriesComponent } from './countries/countries.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
         ChartsModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        CountriesComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend just remove to switch to a real backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }