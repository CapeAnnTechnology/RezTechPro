import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VENUE_ROUTES } from './../_routes';

import { CoreModule } from './../core/core.module';
import { VenueComponent } from './venue.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { VenueChecklistsComponent } from './venue-checklists/venue-checklists.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(VENUE_ROUTES)
  ],
  declarations: [
    VenueComponent,
    VenueDetailComponent,
    VenueChecklistsComponent,
  ]
})
export class VenueModule { }