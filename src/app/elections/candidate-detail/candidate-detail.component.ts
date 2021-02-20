import {Component, OnInit} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Candidate} from '../candidate';
import {Election} from '../election';
import {Assembly} from '../assembly';
import {Electorate} from '../electorate';
import {Party} from '../party';
import {BallotEntry} from '../ballot-entry';
import {ElectionsService} from '../elections.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Note} from '../note';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.styl']
})
export class CandidateDetailComponent implements OnInit {

  candidate$: Observable<Candidate>;
  candidateCode: string;

  election$: Observable<Election>;
  assembly$: Observable<Assembly>;
  electorate$: Observable<Electorate>;
  party$: Observable<Party>;
  ballotEntry$: Observable<BallotEntry>;
  notes$: Observable<Note[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    // when the 'candidate_code' changes, refresh all the data
    this.candidate$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const code = params.get('candidate_code');
        return code ? this.service.candidate(code) : EMPTY;
      })
    );

    this.candidate$.subscribe(item => {
      this.candidateCode = item.code;

      this.election$ = this.service.election(item.electionCode);
      this.assembly$ = this.service.assembly(item.assemblyCode);
      this.electorate$ = this.service.electorate(item.electorateCode);
      this.party$ = this.service.party(item.partyCode);
      this.ballotEntry$ = this.service.ballotEntry(item.ballotEntryCode);
    });
  }

  open(content: any): void {
    this.modalService.open(content, {centered: true});
  }
}
