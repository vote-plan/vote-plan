import { Component, OnInit } from '@angular/core';
import { Electorate } from '../electorate';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Election } from '../election';
import { Assembly } from '../assembly';
import { Party } from '../party';
import { Candidate } from '../candidate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vote-home',
  templateUrl: './vote-home.component.html',
  styleUrls: ['./vote-home.component.css']
})
export class VoteHomeComponent implements OnInit {

  faSearch = faSearch;

  electorate$: Observable<Electorate>;
  electorateCode: string;

  election$: Observable<Election>;
  assembly$: Observable<Assembly>;

  parties$: Observable<Party[]>;
  candidates$: Observable<Candidate[]>;

  displayFilter = '';
  candidatesDisplay$: Observable<Candidate[]>;

  candidates: Candidate[];

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

      this.candidates$ = this.service.candidatesForElectorate(this.electorateCode);
      this.candidates$.subscribe(items => this.candidates = items);

      this.updateDisplay();
    });
  }

  updateFilter(searchValue: string) {
    this.displayFilter = searchValue ? searchValue : '';
    this.updateDisplay();
  }

  updateDisplay(): void {
    this.candidatesDisplay$ = this.service.entitiesNameDisplay(this.candidates$, this.displayFilter)
      .pipe(
        map(items => items.sort((a, b) => a.ballotEntry.localeCompare(b.ballotEntry)))
      );
  }
}
