import { BrowserModule, Title  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { routing } from './app-routing.module';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

import { VenueComponent } from './venue';
import { UserComponent, UserAddComponent } from './user';

import { AlertComponent, NavigationComponent, FooterComponent } from './_directives';

import { AuthGuard } from './_guards';

import { JwtInterceptor } from './_helpers';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AlertService, AuthenticationService, UserService } from './_services';

// import { AddressComponent } from './address/address.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { FormComponent } from './form/form.component';
// import { FormDetailComponent } from './form-detail/form-detail.component';
// import { MessagesComponent } from './messages/messages.component';
// import { NavigationComponent } from './navigation';
// import { UserComponent } from './user/user.component';
// import { UserDetailComponent } from './user-detail/user-detail.component';

// import { VenueDetailComponent } from './venue-detail/venue-detail.component';

import { PhonePipe } from './_pipes';
import { InMemoryDataService }  from './_services/in-memory-data.service';



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    FooterComponent,
    HomeComponent,    
    LoginComponent,
    NavigationComponent,
    RegisterComponent,    
    UserComponent,
    UserAddComponent,    
    VenueComponent,    
    // MessagesComponent,
    // DashboardComponent,
    // UserDetailComponent,
    // VenueDetailComponent,
    // PhonePipe,
    // AddressComponent,
    // FormComponent,
    // FormDetailComponent,
    
    
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    
    

  ],
  providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        Title,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
        fakeBackendProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
