import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from './../../../service/app-service/app.service';

@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrls: ['./book-details-page.component.scss']
})
export class BookDetailsPageComponent implements OnInit {

  constructor(private appService: AppService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.appService.setOptions(this.route.snapshot.data.optionsData);
  }

}
