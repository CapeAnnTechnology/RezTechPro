import { BrowserModule, Title  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from './auth';
import { CoreModule } from './core';

import { AppComponent } from './app.component';
import { routing } from './app-routing.module';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

import { FormComponent, FormAddComponent } from './form';
// import { VenueComponent, VenueDetailComponent } from './venue';
import { UserComponent, UserAddComponent } from './user';

import { AlertComponent,
         NavigationComponent } from './_directives';

import { AuthGuard,
         AdminGuard } from './_guards';

// import { JwtInterceptor } from './_helpers';

import { AlertService,
         AuthenticationService,
         ChecklistService,
         UserService,
         VenueService,
         BusinessService,
         InspectionService,
         AuthService,
         EventService,
         UtilityService,
         FilterService,
         SortService,
         LogService, } from './_services';

import { CallbackComponent } from './callback/callback.component';

import { LogComponent } from './log';

import { AddressComponent } from './address';
import { DashboardComponent } from './dashboard';
import { FormDetailComponent } from './form-detail';
import { MessagesComponent } from './messages';
import { UserDetailComponent } from './user-detail';

import { environment } from '../environments/environment';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MyRsvpsComponent } from './my-rsvps/my-rsvps.component';
// import { InspectionComponent } from './inspection';

@NgModule({
  declarations: [
    AddressComponent,
    AlertComponent,
    AppComponent,
    CallbackComponent,
    DashboardComponent,
    FormAddComponent,
      FormComponent,
      FormDetailComponent,
    HomeComponent,
    LogComponent,
    LoginComponent,
    MessagesComponent,
    MyRsvpsComponent,
    NavigationComponent,
    RegisterComponent,
    UserAddComponent,
      UserComponent,
      UserDetailComponent,
    //  InspectionComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    LoggerModule.forRoot({ serverLoggingUrl: `${environment.BASE_API}log/new/`,
                           level: NgxLoggerLevel.DEBUG,
                           serverLogLevel: NgxLoggerLevel.LOG
                         }),
    AuthModule.forRoot(),
    CoreModule.forRoot(),

  ],
  providers: [
        AlertService,
        AuthenticationService,
        AuthGuard,
        AuthService,
        AdminGuard,
        BusinessService,
        InspectionService,
        ChecklistService,
        DatePipe,
        EventService,
        Title,
        UserService,
        LogService,
        UtilityService,
        VenueService,
        FilterService,
        SortService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
