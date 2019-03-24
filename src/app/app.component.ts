import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  navigationInProgress: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.navigationInProgress = true;
      }
      if(event instanceof NavigationEnd) {
        this.navigationInProgress = false;
      }
    });
  }
}
