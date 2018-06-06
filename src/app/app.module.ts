import { BrowserModule, Title  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './_services/in-memory-data.service';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { VenueComponent } from './venue/venue.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { PhonePipe } from './_pipes/phone.pipe';
import { AddressComponent } from './address/address.component';
import { FormComponent } from './form/form.component';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AlertComponent } from './_directives/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    UserComponent,
    UserDetailComponent,
    VenueComponent,
    VenueDetailComponent,
    PhonePipe,
    AddressComponent,
    FormComponent,
    FormDetailComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
 
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AngularFontAwesomeModule

  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
