import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BUSINESS_ROUTES } from './../_routes';

import { CoreModule } from './../core/core.module';
import { BusinessComponent } from './business.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessVenuesComponent } from './business-venues/business-venues.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(BUSINESS_ROUTES)
  ],
  declarations: [
    BusinessComponent,
    BusinessDetailComponent,
    BusinessVenuesComponent
  ]
})
export class BusinessModule { }