import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { event } from 'src/app/dtos/event.dto';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  unsubscribe$: Subject<boolean> = new Subject();
  requestForm: FormGroup | undefined;
  title: string = ""
  description: string = ""
  pay: string = ""
  sname: string = ""
  eventItems: Array<event>

  constructor(private eventService: EventService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.requestForm = new FormGroup({
      edescription: new FormControl(null, Validators.required),
      edate: new FormControl(null, Validators.required),
      ename: new FormControl(null, Validators.required),
    })

    this.eventService.geEventData().pipe(takeUntil(this.unsubscribe$))
    .subscribe((eventData: event[]) => {
      this.eventItems = eventData
    });
  }

  request() {
    let eventData = {} as event
    eventData = this.requestForm.value
    eventData.host = "Aathira"
    this.requestForm.reset()
    this.eventService.posteventData(eventData).pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        console.log(response)
        this.toastr.success("Your event has been submitted! It will be shown once approved by the council")
      });
  }

  joinEvent(i) {
    let customerName = this.eventItems[i]['host']
    this.toastr.success(`${customerName} has been notified that you are interested in this event`);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
