import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { event } from '../dtos/event.dto';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url:string;

  constructor(private http: HttpClient) { 
    this.url = environment.apiRootUrl + "getdata/event"
  }

  geEventData(): Observable<event[]> {
    return this.http.get<event[]>(this.url)
  }

  posteventData(eventData: event): Observable<event[]> {
    eventData['type'] = "event"
    this.url = environment.apiRootUrl + "putdata/"
    return this.http.post<event[]>(this.url, eventData)
  }

}
