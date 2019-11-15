import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Counter } from './counter';
import { Observable, Subscription } from 'rxjs';
import { ActionCableService, Channel } from 'angular2-actioncable';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  //public initialValue = [12, 5, 7];
  private counterUrl = 'https://lp4asgadot.herokuapp.com/counters/';
  private countersUrl = 'https://lp4asgadot.herokuapp.com/counters.json';

  subscription: Subscription;

  private counterObservable: Map<number, Observable<Counter>> = new Map()

  constructor(private httpClient: HttpClient, private cableService: ActionCableService) { 
    // Open a connection and obtain a reference to the channel
    const channel: Channel = this.cableService
    .cable('wss://lp4asgadot.herokuapp.com/cable')
    .channel('CountersChannel ', {});

      // Subscribe to incoming messages
      this.subscription = channel.received().subscribe(message => {
          console.log(message)
      });
  }

  reset() {
    //this.initialValue = [0, 0, 0];
  }

  increment(id: number): Observable<Counter> {
    /*this.initialValue[position]++;
    return this.initialValue[position];*/
    return this.httpClient.patch<Counter>(this.counterUrl + id + '.json', {});
  }

  getCounter(id: number): Observable<Counter> {
    if (! this.counterObservable.has(id)) {
      this.counterObservable[id] = new EventEmitter<Counter>() 
    }
    this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/"+ id +".json")
                   .subscribe(counter =>  this.counterObservable[id].emit(counter))
    return this.counterObservable[id]
  }

  getCounters(): Observable<Counter[]> {
    return this.httpClient.get<Counter[]>(this.countersUrl);
  }
}