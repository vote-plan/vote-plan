import {Component, OnInit} from '@angular/core';

import {ElectionsService} from '../elections.service';
import {ElectionModel} from '../models/election';

@Component({
  selector: 'app-elections-upcoming',
  templateUrl: './elections-upcoming.component.html',
  styleUrls: ['./elections-upcoming.component.css']
})
export class ElectionsUpcomingComponent implements OnInit {
  elections: ElectionModel[] = [];

  constructor(private electionsService: ElectionsService) {
  }

  ngOnInit(): void {
    this.electionsService.getElectionsUpcoming().subscribe(x => this.elections = x);
  }
}
