import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/client-area/login/login.component';
import { RegisterComponent } from './components/client-area/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComponentsModule } from './components/module/components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvailableParkingsComponent } from './components/dashboard/dialogs/available-parkings/available-parkings.component';
import { ReleaseVehicleComponent } from './components/dashboard/dialogs/release-vehicle/release-vehicle.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AvailableParkingsComponent,
    ReleaseVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
