import { Component, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EventModel } from './../../../_models';
import { EventService } from './../../../_services';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})
export class DeleteEventComponent implements OnDestroy {
  @Input() event: EventModel;
  confirmDelete: string;
  deleteSub: Subscription;
  submitting: boolean;
  error: boolean;

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  removeEvent() {
    this.submitting = true;
    // DELETE event by ID
    this.deleteSub = this.eventService
      .deleteEvent$(this.event._id)
      .subscribe(
        res => {
          this.submitting = false;
          this.error = false;
          console.log(res.message);
          // If successfully deleted event, redirect to Admin
          this.router.navigate(['/admin']);
        },
        err => {
          console.error(err);
          this.submitting = false;
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }

}