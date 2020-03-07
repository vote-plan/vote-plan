import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';
import { Election } from '../election';
import { Observable } from 'rxjs';
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
  electionDate: Date;
  electionLocation: string;

  assemblies$: Observable<Assembly[]>;
  parties$: Observable<Party[]>;
  electorates$: Observable<Electorate[]>;
  candidates$: Observable<Candidate[]>;

  displayFilter = '';
  assembliesMatches$: Observable<Assembly[]>;
  partiesMatches$: Observable<Party[]>;
  electoratesMatches$: Observable<Electorate[]>;
  candidatesMatches$: Observable<Candidate[]>;

  assembliesDisplay$: Observable<Assembly[]>;
  partiesDisplay$: Observable<Party[]>;
  electoratesDisplay$: Observable<Electorate[]>;
  candidatesDisplay$: Observable<Candidate[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) {
  }

  ngOnInit() {
    // when the 'election_code' changes, refresh all the data
    this.election$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.election(params.get('election_code'))
      )
    );

    this.election$.subscribe(election => {
      this.electionCode = election.code;
      this.electionDate = this.service.electionDate(election);
      this.electionLocation = this.service.electionLocationText(election);

      this.assemblies$ = this.service.assembliesForElection(this.electionCode);
      this.parties$ = this.service.partiesForElection(this.electionCode);
      this.electorates$ = this.service.electoratesForElection(this.electionCode);
      this.candidates$ = this.service.candidatesForElection(this.electionCode);

      this.updateDisplay();
    });
  }

  updateFilter(searchValue: string) {
    this.displayFilter = searchValue ? searchValue : '';
    this.updateDisplay();
  }

  updateDisplay(): void {
    this.assembliesMatches$ = this.service.entitiesTitleDisplay(this.assemblies$, this.displayFilter);
    this.partiesMatches$ = this.service.entitiesTitleDisplay(this.parties$, this.displayFilter);
    this.electoratesMatches$ = this.service.entitiesTitleDisplay(this.electorates$, this.displayFilter);
    this.candidatesMatches$ = this.service.entitiesNameDisplay(this.candidates$, this.displayFilter);

    this.assembliesDisplay$ = this.service.entitiesLimit(this.assembliesMatches$);
    this.partiesDisplay$ = this.service.entitiesLimit(this.partiesMatches$);
    this.electoratesDisplay$ = this.service.entitiesLimit(this.electoratesMatches$);
    this.candidatesDisplay$ = this.service.entitiesLimit(this.candidatesMatches$);
  }

}
