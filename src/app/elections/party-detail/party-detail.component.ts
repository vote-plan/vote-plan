import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ElectionsService} from '../elections.service';
import {switchMap} from 'rxjs/operators';
import {Party} from '../party';
import {EMPTY, Observable, of} from 'rxjs';
import {Assembly} from '../assembly';
import {Election} from '../election';
import {Electorate} from '../electorate';
import {Candidate} from '../candidate';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.styl']
})
export class PartyDetailComponent implements OnInit {

  faSearch = faSearch;

  party$: Observable<Party>;
  partyCode: string;

  election$: Observable<Election>;

  assemblies$: Observable<Assembly[]>;
  electorates$: Observable<Electorate[]>;
  candidates$: Observable<Candidate[]>;

  displayFilter: string;
  assembliesMatches$: Observable<Assembly[]>;
  electoratesMatches$: Observable<Electorate[]>;
  candidatesMatches$: Observable<Candidate[]>;

  assembliesDisplay$: Observable<Assembly[]>;
  electoratesDisplay$: Observable<Electorate[]>;
  candidatesDisplay$: Observable<Candidate[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) {
    this.party$ = EMPTY;
    this.partyCode = '';

    this.election$ = EMPTY;

    this.assemblies$ = of([]);
    this.electorates$ = of([]);
    this.candidates$ = of([]);

    this.displayFilter = '';
    this.assembliesMatches$ = of([]);
    this.electoratesMatches$ = of([]);
    this.candidatesMatches$ = of([]);

    this.assembliesDisplay$ = of([]);
    this.electoratesDisplay$ = of([]);
    this.candidatesDisplay$ = of([]);
  }

  ngOnInit() {
    // when the 'party_code' changes, refresh all the data
    this.party$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const code = params.get('party_code');
        return code ? this.service.party(code) : EMPTY;
      })
    );

    this.party$.subscribe(item => {
      this.partyCode = item.code;

      this.election$ = this.service.election(item.electionCode);
      this.assemblies$ = this.service.assembliesForParty(this.partyCode);
      this.electorates$ = this.service.electoratesForParty(this.partyCode);
      this.candidates$ = this.service.candidatesForParty(this.partyCode);

      this.updateDisplay();
    });
  }

  updateFilter(searchValue: string) {
    this.displayFilter = searchValue ? searchValue : '';
    this.updateDisplay();
  }

  updateDisplay(): void {
    this.assembliesMatches$ = this.service.entitiesTitleDisplay(this.assemblies$, this.displayFilter);
    this.electoratesMatches$ = this.service.entitiesTitleDisplay(this.electorates$, this.displayFilter);
    this.candidatesMatches$ = this.service.entitiesNameDisplay(this.candidates$, this.displayFilter);

    this.assembliesDisplay$ = this.service.entitiesLimit(this.assembliesMatches$);
    this.electoratesDisplay$ = this.service.entitiesLimit(this.electoratesMatches$);
    this.candidatesDisplay$ = this.service.entitiesLimit(this.candidatesMatches$);
  }
}
