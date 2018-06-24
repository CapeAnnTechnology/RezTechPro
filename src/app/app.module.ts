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

// import { AddressComponent } from './address/address.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { FormDetailComponent } from './form-detail/form-detail.component';
// import { MessagesComponent } from './messages/messages.component';
// import { NavigationComponent } from './navigation';
// import { UserComponent } from './user/user.component';
// import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    BusinessComponent,
    FooterComponent,
    FormComponent,
        FormAddComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    UserComponent,
        UserAddComponent,
    VenueComponent,
        VenueDetailComponent,
    HeaderComponent,
    CallbackComponent,
    LoadingComponent,
    AdminComponent,
    EventComponent,
    EventDetailComponent,
    RsvpComponent,
    RsvpFormComponent,
    SubmittingComponent,
    ChecklistComponent,
    ChecklistDetailComponent,
    PhonePipe,
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
