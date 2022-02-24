import { Component, OnInit } from '@angular/core';
import {take} from 'rxjs';
import {ElectionsService} from '../elections.service';
import {ActivatedRoute} from '@angular/router';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {CandidateModel} from '../models/candidate';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  faWarning = faExclamation;

  candidates: CandidateModel[] = [];

  constructor(private service: ElectionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const electionCode = routeParams.get('electionCode');
    this.service.getCandidates(electionCode).pipe(take(10)).subscribe(x => this.candidates = x);
  }

}
