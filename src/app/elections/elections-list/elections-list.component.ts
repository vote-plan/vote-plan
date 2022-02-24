import {Component, Input, OnInit} from '@angular/core';
import {ElectionModel} from '../models/election';
import {ElectionsService} from '../elections.service';

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
    const diff = election.getDisplayDiffFromNow();
    return diff ? `held ${diff}` : "";
  }
}
