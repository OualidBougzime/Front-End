import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Counter } from './counter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  //public initialValue = [12, 5, 7];
  private counterUrl = 'https://lp4asgadot.herokuapp.com/counters/';
  private countersUrl = 'https://lp4asgadot.herokuapp.com/counters.json';

  constructor(private http: HttpClient) { }

  reset() {
    //this.initialValue = [0, 0, 0];
  }

  increment(id: number): Observable<Counter> {
    /*this.initialValue[position]++;
    return this.initialValue[position];*/
    return this.http.patch<Counter>(this.counterUrl + id + '.json', {});
  }

  getCounter(id: number): Observable<Counter> {
    return this.http.get<Counter>(this.counterUrl + id + '.json');
  }

  getCounters(): Observable<Counter[]> {
    return this.http.get<Counter[]>(this.countersUrl);
  }
}