import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { donation } from '../dtos/donation.dto';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private geturl:string;
  private posturl: string;
  myDonationSubject$ = new BehaviorSubject<donation[]>([]);

  constructor(private http: HttpClient) { 
    this.geturl = environment.apiRootUrl + "getdata/donation"
    this.posturl = environment.apiRootUrl + "putdata/"
  }

  getDonationData(): Observable<donation[]> {
    return this.http.get<donation[]>(this.geturl)
  }

  postDonationData(donationData: donation): Observable<donation[]>{
    donationData['type'] = "donation"
    return this.http.post<donation[]>(this.posturl, donationData)
  }

  broadcastDonationData(donationData: donation[]) {
    return this.myDonationSubject$.next(donationData)
  }

  getAllDonationData() {
    return this.myDonationSubject$.asObservable()
  }
}
