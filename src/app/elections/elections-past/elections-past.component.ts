import {Component, OnInit} from '@angular/core';
import {ElectionModel} from '../models/election';
import {ElectionsService} from '../elections.service';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-elections-past',
  templateUrl: './elections-past.component.html',
  styleUrls: ['./elections-past.component.css']
})
export class ElectionsPastComponent implements OnInit {
  faWarning = faExclamation;
  elections: ElectionModel[] = [];

  constructor(private electionsService: ElectionsService) {
  }

  ngOnInit(): void {
    this.electionsService.getElectionsPast().subscribe(x => this.elections = x);
  }
}
