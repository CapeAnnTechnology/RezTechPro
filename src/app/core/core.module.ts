import { NgModule, ModuleWithProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AnswerPipe, PhonePipe } from './../_pipes';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { EventService, UtilityService, FilterService } from './../_services';
import { SubmittingComponent } from './../_forms';
import { LoadingComponent, HeaderComponent, FooterComponent } from './../_directives';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SubmittingComponent,
    PhonePipe,
    AnswerPipe
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    SubmittingComponent,
    PhonePipe,
    AnswerPipe,
    AngularFontAwesomeModule,
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        Title,
        DatePipe,
        EventService,
        UtilityService,
        FilterService
      ]
    };
  }
}