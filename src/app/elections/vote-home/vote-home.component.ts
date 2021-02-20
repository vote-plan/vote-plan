import {Component, OnInit} from '@angular/core';
import {Electorate} from '../electorate';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ElectionsService} from '../elections.service';
import {map, switchMap} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {Election} from '../election';
import {Assembly} from '../assembly';
import {Party} from '../party';
import {Candidate} from '../candidate';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vote-home',
  templateUrl: './vote-home.component.html',
  styleUrls: ['./vote-home.component.styl']
})
export class VoteHomeComponent implements OnInit {

  faSearch = faSearch;

  electorate$: Observable<Electorate>;
  electorateCode: string;

  election$: Observable<Election>;
  assembly$: Observable<Assembly>;

  parties$: Observable<Party[]>;
  candidates$: Observable<Candidate[]>;

  displayFilter: string;
  candidatesMatches$: Observable<Candidate[]>;
  candidatesDisplay$: Observable<Candidate[]>;

  candidates: Candidate[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) {

    this.electorate$ = EMPTY;
    this.electorateCode = '';

    this.election$ = EMPTY;
    this.assembly$ = EMPTY;

    this.parties$ = EMPTY;
    this.candidates$ = of([]);

    this.displayFilter = '';
    this.candidatesMatches$ = EMPTY;
    this.candidatesDisplay$ = EMPTY;

    this.candidates = [];
  }

  ngOnInit(): void {
    // when the 'electorate_code' changes, refresh all the data
    this.electorate$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const code = params.get('electorate_code');
        return code ? this.service.electorate(code) : EMPTY;
      })
    );

    this.electorate$.subscribe(item => {
      this.electorateCode = item.code;

      this.election$ = this.service.election(item.electionCode);
      this.assembly$ = this.service.assembly(item.assemblyCode);

      this.candidates$ = this.service.candidatesForElectorate(this.electorateCode);
      this.candidates$.subscribe(items => this.candidates = items);

      this.updateDisplay();
    });
  }

  updateFilter(searchValue: string): void {
    this.displayFilter = searchValue ? searchValue : '';
    this.updateDisplay();
  }

  updateDisplay(): void {
    this.candidatesMatches$ = this.service.entitiesNameDisplay(this.candidates$, this.displayFilter)
      .pipe(
        map(items => items.sort((a, b) => a.ballotEntryCode.localeCompare(b.ballotEntryCode)))
      );
    this.candidatesDisplay$ = this.service.entitiesLimit(this.candidatesMatches$);
  }
}
