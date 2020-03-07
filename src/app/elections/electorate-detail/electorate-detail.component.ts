import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';
import { Electorate } from '../electorate';
import { Observable } from 'rxjs';
import { Party } from '../party';
import { Election } from '../election';
import { Assembly } from '../assembly';
import { Candidate } from '../candidate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-electorate-detail',
  templateUrl: './electorate-detail.component.html',
  styleUrls: ['./electorate-detail.component.css']
})
export class ElectorateDetailComponent implements OnInit {

  faSearch = faSearch;

  electorate$: Observable<Electorate>;
  electorateCode: string;

  election$: Observable<Election>;
  assembly$: Observable<Assembly>;

  parties$: Observable<Party[]>;
  candidates$: Observable<Candidate[]>;

  displayFilter = '';
  partiesMatches$: Observable<Party[]>;
  candidatesMatches$: Observable<Candidate[]>;

  partiesDisplay$: Observable<Party[]>;
  candidatesDisplay$: Observable<Candidate[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) {
  }

  ngOnInit() {
    // when the 'electorate_code' changes, refresh all the data
    this.electorate$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.electorate(params.get('electorate_code'))
      )
    );

    this.electorate$.subscribe(item => {
      this.electorateCode = item.code;

      this.election$ = this.service.election(item.election);
      this.assembly$ = this.service.assembly(item.assembly);

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
