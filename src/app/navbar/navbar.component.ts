import { Component, OnInit  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Counter } from '../counter';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  counters: Array<Counter> = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

   constructor(
    private breakpointObserver: BreakpointObserver, 
    public auth: AuthService, 
    private counterService: CounterService) {}
  
    ngOnInit() {
      // Récupération des compteurs
      this.counterService.getCounters()
        .subscribe((_counters) => {
          _counters.forEach((_counter) => {
            // ajout des compteurs dans le tableau
            this.counters.push(_counter);
          });
        });
    }
}
