import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AddPersonComponent} from './components/add-person/add-person.component';
import {PersonDetailComponent} from './components/person-detail/person-detail.component';
import {PersonListComponent} from './components/person-list/person-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {NgxMaskModule} from 'ngx-mask';
import {PoModule} from '@po-ui/ng-components';
import {DatePipe, registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {HttpErrorInterceptor} from './http-error.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Ng2SmartTableModule} from 'ng2-smart-table';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    AddPersonComponent,
    PersonDetailComponent,
    PersonListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    PoModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-right",
    }),
    Ng2SmartTableModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
