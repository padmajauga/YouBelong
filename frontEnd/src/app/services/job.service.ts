import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { job } from '../dtos/job.dto';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private geturl:string;
  private posturl:string;
  myJobsSubject$ = new BehaviorSubject<job[]>([]);

  constructor(private http: HttpClient) { 
    this.geturl = environment.apiRootUrl + "getdata/jobs"
    this.posturl = environment.apiRootUrl + "putdata/"
  }

  getJobData(): Observable<job[]> {
    return this.http.get<job[]>(this.geturl)
  }

  postJobData(jobData: job): Observable<job[]>{
    jobData['type'] = "jobs"
    return this.http.post<job[]>(this.posturl, jobData)
  }

  broadcastJobData(jobData: job[]) {
    return this.myJobsSubject$.next(jobData)
  }

  getAllJobData() {
    return this.myJobsSubject$.asObservable()
  }
}

