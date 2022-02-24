import { Component, OnInit } from '@angular/core';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {ElectionModel} from '../models/election';
import {ElectionsService} from '../elections.service';
import {ActivatedRoute} from '@angular/router';
import {ElectorateModel} from '../models/electorate';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {
  faWarning = faExclamation;
  election!: ElectionModel | undefined;
  electorates: ElectorateModel[] | undefined  = [];

  constructor(private service: ElectionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const electionCode = routeParams.get('electionCode');
    this.service.getElection(electionCode).subscribe(election => this.election = election);
    this.service.getElectorates(electionCode).subscribe(e => this.electorates = e);
  }
}
