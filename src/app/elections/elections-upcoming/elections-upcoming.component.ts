import {Component, OnInit} from '@angular/core';

import {ElectionsService} from '../elections.service';
import {ElectionModel} from '../models/election';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-elections-upcoming',
  templateUrl: './elections-upcoming.component.html',
  styleUrls: ['./elections-upcoming.component.css']
})
export class ElectionsUpcomingComponent implements OnInit {
  faWarning = faExclamation;
  elections: ElectionModel[] = [];

  constructor(private electionsService: ElectionsService) {
  }

  ngOnInit(): void {
    this.electionsService.getElectionsUpcoming().subscribe(x => this.elections = x);
  }
}
