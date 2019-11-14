import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';
import { Counter } from '../counter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'counters';
  counters: Array<Counter> = [];

  constructor(private counterService: CounterService) { }

  ngOnInit() {
    // Récupération des compteurs
    this.counterService.getCounters()
      .subscribe((_counters) => {
        _counters.forEach((_counter) => {
          // ajout des compteurs dans le tableau
          this.counters.push(_counter);
        });
      });
    // affichage en console de l'ensemble des compteurs
    console.log(this.counters);
  }

  reset() {
    this.counterService.reset();
  }

}