import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { pals } from 'src/app/dtos/pals.dto';
import { PalsService } from 'src/app/services/pals.service';

@Component({
  selector: 'app-pals',
  templateUrl: './pals.component.html',
  styleUrls: ['./pals.component.scss']
})
export class PalsComponent {
  unsubscribe$: Subject<boolean> = new Subject();
  palsItems: Array<pals>

  constructor(private palsService: PalsService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.palsService.getPalsData()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((pals: pals[]) => {
      this.palsItems = pals
    })
  }

  sendRequest(i) {
    let customerName = this.palsItems[i]['pname']
    this.toastr.success(`${customerName} has been notified of your interest!`);
  }
}
