import { Component, OnInit } from '@angular/core';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {ElectionsService} from '../elections.service';
import {take} from 'rxjs';
import {PartyModel} from '../models/party';
import {ActivatedRoute} from '@angular/router';
import {ElectionModel} from '../models/election';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {
  faWarning = faExclamation;
  parties: PartyModel[] = [];
  election: ElectionModel | undefined;

  constructor(private service: ElectionsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const electionCode = routeParams.get('electionCode') ?? undefined;
    this.service.getElection(electionCode).subscribe(i => this.election = i);
    this.service.getParties(electionCode).subscribe(i => this.parties = i);
  }

}
