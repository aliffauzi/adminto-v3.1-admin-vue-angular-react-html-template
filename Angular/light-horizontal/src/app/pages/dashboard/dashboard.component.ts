import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private eref: ElementRef, private eventService: EventService) {

  }

  ngOnInit() {
    this.eventService.broadcast('changePageHeading', 'Dashboard');
  }

  ngAfterViewInit() { }
}
