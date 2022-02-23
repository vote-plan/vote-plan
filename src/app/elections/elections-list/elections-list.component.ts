import {Component, Input, OnInit} from '@angular/core';
import {ElectionModel} from '../models/election';
import {ElectionsService} from '../elections.service';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-elections-list',
  templateUrl: './elections-list.component.html',
  styleUrls: ['./elections-list.component.css']
})
export class ElectionsListComponent implements OnInit {
  @Input() elections: ElectionModel[] = [];

  constructor(private electionsService: ElectionsService) {
  }

  ngOnInit(): void {
  }

  getElectionDateDiffDisplay(election: ElectionModel): string {
    const now = DateTime.now();
    const date = election.getDate();
    const diff = election.getDisplayDiffFromNow();

    // hasSame: both DateTimes have the same calendar day (which implies they also have the same calendar year and month)
    if (date.hasSame(date, 'day')) {
      return 'being held today';
    } else if (date < now) {
      return `that was held ${diff} ago`;
    } else {
      return `to be held in ${diff}`;
    }
  }
}
