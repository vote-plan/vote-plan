import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';
import { Election } from '../election';
import { Observable } from 'rxjs';
import { MessageService } from '../../message.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Assembly } from '../assembly';
import { Party } from '../party';
import { Electorate } from '../electorate';
import { Candidate } from '../candidate';

@Component({
  selector: 'app-election-detail',
  templateUrl: './election-detail.component.html',
  styleUrls: ['./election-detail.component.css']
})
export class ElectionDetailComponent implements OnInit {

  faSearch = faSearch;
  election$: Observable<Election>;
  electionCode: string;
  assemblies$: Observable<Assembly[]>;
  parties$: Observable<Party[]>;
  electorates$: Observable<Electorate[]>;
  candidates$: Observable<Candidate[]>;
  displayFilter = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.election$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const electionCode = params.get('election_code');
        const result = this.service.election(electionCode);
        this.messageService.debug('ngOnInit', 'election$', result);
        this.electionCode = electionCode;
        return result;
      })
    );
    this.election$.subscribe(() => this.updateDisplay());
  }

  getElectionDate(election: Election): Date {
    return this.service.electionDate(election);
  }

  getElectionLocationText(election: Election): string {
    return this.service.electionLocationText(election);
  }

  updateFilter(searchValue: string) {
    this.displayFilter = searchValue ? searchValue : '';
    this.updateDisplay();
  }

  updateDisplay(): void {
    this.assemblies$ = this.service.assembliesForElection(this.electionCode, this.displayFilter);
    this.parties$ = this.service.electionParties(this.electionCode, this.displayFilter);
    this.electorates$ = this.service.electoratesForElection(this.electionCode, this.displayFilter);
    this.candidates$ = this.service.electionCandidates(this.electionCode, this.displayFilter);
  }

}
