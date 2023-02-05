import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { job } from 'src/app/dtos/job.dto';
import { jobStatus } from 'src/app/enums/job.enum';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  unsubscribe$: Subject<boolean> = new Subject();
  requestForm: FormGroup | undefined;
  title: string = ""
  description: string = ""
  pay: string = ""
  sname: string = ""
  jobItems: Array<job>;
  myJobItems: Array<job>
  statusOptions = [jobStatus.EMPLOYEE, jobStatus.EMPLOYER]

  constructor(private jobService: JobService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.requestForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      skillDescription: new FormControl(null, Validators.required),
      pay: new FormControl(null, Validators.required),
      sname: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required)
    })

    this.jobService.getAllJobData()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((jobItems) => {
      this.myJobItems = jobItems
    })

    this.jobService
      .getJobData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((jobData: job[]) => {
        this.jobItems = jobData
      });
  }

  request() {
    let jobRequest = {} as job;
    jobRequest = this.requestForm.value
    this.requestForm.reset()
    this.jobService.postJobData(jobRequest).pipe(takeUntil(this.unsubscribe$))
    .subscribe((jobData: job[]) => {
      this.jobService.broadcastJobData(jobData)
      this.toastr.show("Your request has been sent!")
    });
  }

  applyForJob(index) {
    let customerName = this.jobItems[index]['sname']
    this.toastr.success(`${customerName} has been notified of your interest and will be in touch with you!`);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
