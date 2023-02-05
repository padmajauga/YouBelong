import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { pals } from '../dtos/pals.dto';

@Injectable({
  providedIn: 'root'
})
export class PalsService {
  private url:string;

  constructor(private http: HttpClient) { 
    this.url = environment.apiRootUrl + "getdata/pals"
  }

  getPalsData(): Observable<pals[]> {
    return this.http.get<pals[]>(this.url)
  }
}
