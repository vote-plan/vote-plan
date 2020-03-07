import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';
import { Party } from '../party';
import { Observable } from 'rxjs';
import { Assembly } from '../assembly';
import { Election } from '../election';
import { Electorate } from '../electorate';
import { Candidate } from '../candidate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit {

  faSearch = faSearch;

  party$: Observable<Party>;
  partyCode: string;

  election$: Observable<Election>;

  assemblies$: Observable<Assembly[]>;
  electorates$: Observable<Electorate[]>;
  candidates$: Observable<Candidate[]>;

  displayFilter = '';
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
  }

  ngOnInit() {
    // when the 'party_code' changes, refresh all the data
    this.party$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.party(params.get('party_code'))
      )
    );

    this.party$.subscribe(item => {
      this.partyCode = item.code;

      this.election$ = this.service.election(item.election);
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
