import { Component, OnInit } from '@angular/core';
import {take} from 'rxjs';
import {ElectionsService} from '../elections.service';
import {ActivatedRoute} from '@angular/router';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {CandidateModel} from '../models/candidate';
import {ElectionModel} from '../models/election';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  faWarning = faExclamation;
  candidates: CandidateModel[] = [];
  election: ElectionModel | undefined;

  constructor(private service: ElectionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const electionCode = routeParams.get('electionCode') ?? undefined;
    this.service.getElection(electionCode).subscribe(i => this.election = i);
    this.service.getCandidates(electionCode).subscribe(i => this.candidates = i);
  }

}
