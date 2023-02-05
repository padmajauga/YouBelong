import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { donation } from 'src/app/dtos/donation.dto';
import { ToastrService } from 'ngx-toastr';
import { donationStatus } from 'src/app/enums/donation.enum';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {
  unsubscribe$: Subject<boolean> = new Subject();
  requestForm: FormGroup | undefined;
  title: string = ""
  description: string = ""
  pay: string = ""
  sname: string = ""
  donationItems: Array<donation>;
  myDonationItems: Array<donation>;
  statusOptions = [donationStatus.REQUEST, donationStatus.DONATE]

  constructor( private donationService: DonationService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.requestForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      dname: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required)
    })

    this.donationService
      .getAllDonationData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((donationItems) => {
        this.myDonationItems = donationItems;
      });

    this.donationService
      .getDonationData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((donationData: donation[]) => {
        this.donationItems = donationData
      });

  }


  postDonation() {
    let donationData = {} as donation;
    donationData = this.requestForm.value
    this.requestForm.reset()
    this.donationService.postDonationData(donationData).pipe(takeUntil(this.unsubscribe$))
    .subscribe((donationData: donation[]) => {
      this.donationService.broadcastDonationData(donationData)
      this.toastr.show("Your request has been sent!")
    });
  }

  contact(position: number) {
    let customerName = this.donationItems[position]['dname']
    this.toastr.success(`${customerName} has been notified of your interest and will be in touch with you!`);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
