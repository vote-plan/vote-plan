import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ElectionsService} from '../elections.service';
import {switchMap} from 'rxjs/operators';
import {Electorate} from '../electorate';
import {EMPTY, Observable, of} from 'rxjs';
import {Party} from '../party';
import {Election} from '../election';
import {Assembly} from '../assembly';
import {Candidate} from '../candidate';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-electorate-detail',
  templateUrl: './electorate-detail.component.html',
  styleUrls: ['./electorate-detail.component.styl']
})
export class ElectorateDetailComponent implements OnInit {

  faSearch = faSearch;

  electorate$: Observable<Electorate>;
  electorateCode: string;

  election$: Observable<Election>;
  assembly$: Observable<Assembly>;

  parties$: Observable<Party[]>;
  candidates$: Observable<Candidate[]>;

  displayFilter: string;
  partiesMatches$: Observable<Party[]>;
  candidatesMatches$: Observable<Candidate[]>;

  partiesDisplay$: Observable<Party[]>;
  candidatesDisplay$: Observable<Candidate[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) {
    this.electorate$ = EMPTY;
    this.electorateCode = '';

    this.election$ = EMPTY;
    this.assembly$ = EMPTY;

    this.parties$ = of([]);
    this.candidates$ = of([]);

    this.displayFilter = '';
    this.partiesMatches$ = of([]);
    this.candidatesMatches$ = of([]);

    this.partiesDisplay$ = of([]);
    this.candidatesDisplay$ = of([]);

  }

  ngOnInit() {
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

      this.parties$ = this.service.partiesForElectorate(this.electorateCode);
      this.candidates$ = this.service.candidatesForElectorate(this.electorateCode);

      this.updateDisplay();
    });
  }

  updateFilter(searchValue: string) {
    this.displayFilter = searchValue ? searchValue : '';
    this.updateDisplay();
  }

  updateDisplay(): void {
    this.partiesMatches$ = this.service.entitiesTitleDisplay(this.parties$, this.displayFilter);
    this.candidatesMatches$ = this.service.entitiesNameDisplay(this.candidates$, this.displayFilter);

    this.partiesDisplay$ = this.service.entitiesLimit(this.partiesMatches$);
    this.candidatesDisplay$ = this.service.entitiesLimit(this.candidatesMatches$);
  }

}
