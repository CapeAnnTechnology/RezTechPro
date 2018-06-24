import { BrowserModule, Title  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { routing } from './app-routing.module';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

import { BusinessComponent } from './business';
import { FormComponent, FormAddComponent } from './form';
import { VenueComponent, VenueDetailComponent } from './venue';
import { UserComponent, UserAddComponent } from './user';

import { AlertComponent,
         NavigationComponent,
         FooterComponent } from './_directives';

import { AuthGuard,
         AdminGuard } from './_guards';

// import { JwtInterceptor } from './_helpers';

import { PhonePipe } from './_pipes';

import { AlertService,
         AuthenticationService,
         ChecklistService,
         UserService,
         VenueService,
         BusinessService,
         AuthService,
         EventService,
         UtilityService,
         FilterService,
         SortService, } from './_services';
import { HeaderComponent } from './_directives/header/header.component';
import { CallbackComponent } from './callback/callback.component';
import { LoadingComponent } from './_directives/loading/loading.component';
import { AdminComponent } from './admin/admin.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { RsvpComponent } from './event/rsvp/rsvp.component';
import { RsvpFormComponent } from './event/rsvp/rsvp-form/rsvp-form.component';
import { SubmittingComponent } from './_forms/submitting.component';
import { ChecklistComponent, ChecklistDetailComponent } from './checklist';

import { AddressComponent } from './address';
import { DashboardComponent } from './dashboard';
import { FormDetailComponent } from './form-detail';
import { MessagesComponent } from './messages';
import { UserDetailComponent } from './user-detail';

@NgModule({
  declarations: [
    AddressComponent,
    AdminComponent,
    AlertComponent,
    AppComponent,
    BusinessComponent,
    CallbackComponent,
    ChecklistComponent,
      ChecklistDetailComponent,
    DashboardComponent,
    EventComponent,
    EventDetailComponent,
    FooterComponent,
    FormAddComponent,
      FormComponent,
      FormDetailComponent,
    HeaderComponent,
    HomeComponent,
    LoadingComponent,
    LoginComponent,
    MessagesComponent,
    NavigationComponent,
    PhonePipe,
    RegisterComponent,
    RsvpComponent,
    RsvpFormComponent,
    SubmittingComponent,
    UserAddComponent,
      UserComponent,
      UserDetailComponent,
    VenueComponent,
      VenueDetailComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
  ],
  providers: [
        AlertService,
        AuthenticationService,
        AuthGuard,
        AuthService,
        AdminGuard,
        BusinessService,
        ChecklistService,
        DatePipe,
        EventService,
        Title,
        UserService,
        UtilityService,
        VenueService,
        FilterService,
        SortService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
