import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';
import { Assembly } from '../assembly';
import { Observable } from 'rxjs';
import { Party } from '../party';
import { Electorate } from '../electorate';
import { Candidate } from '../candidate';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Election } from '../election';

@Component({
  selector: 'app-assembly-detail',
  templateUrl: './assembly-detail.component.html',
  styleUrls: ['./assembly-detail.component.css']
})
export class AssemblyDetailComponent implements OnInit {

  faSearch = faSearch;

  assembly$: Observable<Assembly>;
  assemblyCode: string;

  election$: Observable<Election>;

  parties$: Observable<Party[]>;
  electorates$: Observable<Electorate[]>;
  candidates$: Observable<Candidate[]>;

  displayFilter = '';
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
    // when the 'assembly_code' changes, refresh all the data
    this.assembly$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.assembly(params.get('assembly_code'))
      )
    );

    this.assembly$.subscribe(item => {
      this.assemblyCode = item.code;

      this.election$ = this.service.election(item.election);
      this.parties$ = this.service.partiesForAssembly(this.assemblyCode);
      this.electorates$ = this.service.electoratesForAssembly(this.assemblyCode);
      this.candidates$ = this.service.candidatesForAssembly(this.assemblyCode);

      this.updateDisplay();
    });
  }

  updateFilter(searchValue: string) {
    this.displayFilter = searchValue ? searchValue : '';
    this.updateDisplay();
  }

  updateDisplay(): void {
    this.partiesDisplay$ = this.service.entitiesTitleDisplay(this.parties$, this.displayFilter);
    this.electoratesDisplay$ = this.service.entitiesTitleDisplay(this.electorates$, this.displayFilter);
    this.candidatesDisplay$ = this.service.entitiesNameDisplay(this.candidates$, this.displayFilter);
  }

}
