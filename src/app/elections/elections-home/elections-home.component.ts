import {Component, OnInit} from '@angular/core';
import {ElectionsService} from '../elections.service';
import {take} from 'rxjs';
import {ElectionModel} from '../models/election';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-elections-home',
  templateUrl: './elections-home.component.html',
  styleUrls: ['./elections-home.component.css']
})
export class ElectionsHomeComponent implements OnInit {
  faWarning = faExclamation;

  electionsUpcoming: ElectionModel[] = [];
  electionsPast: ElectionModel[] = [];

  constructor(private service: ElectionsService) {
  }

  ngOnInit(): void {
    this.service.getElectionsUpcoming().pipe(take(10)).subscribe(x => this.electionsUpcoming = x);
    this.service.getElectionsPast().pipe(take(10)).subscribe(x => this.electionsPast = x);
  }

}
