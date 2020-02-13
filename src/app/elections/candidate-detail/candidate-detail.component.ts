import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';
import { Candidate } from '../candidate';
import { Observable } from 'rxjs';
import { Electorate } from '../electorate';
import { Election } from '../election';
import { Assembly } from '../assembly';
import { Party } from '../party';
import { BallotEntry } from '../ballot-entry';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {

  candidate$: Observable<Candidate>;
  candidateCode: string;

  election$: Observable<Election>;
  assembly$: Observable<Assembly>;
  electorate$: Observable<Electorate>;
  party$: Observable<Party>;
  ballotEntry$: Observable<BallotEntry>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    // when the 'candidate_code' changes, refresh all the data
    this.candidate$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.candidate(params.get('candidate_code'))
      )
    );

    this.candidate$.subscribe(item => {
      this.candidateCode = item.code;

      this.election$ = this.service.election(item.election);
      this.assembly$ = this.service.assembly(item.assembly);
      this.electorate$ = this.service.electorate(item.electorate);
      this.party$ = this.service.party(item.party);
      this.ballotEntry$ = this.service.ballotEntry(item.ballotEntry);
    });
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }
}
