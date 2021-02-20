import {Component, OnInit} from '@angular/core';
import {EMPTY} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ElectionsService} from '../elections.service';
import {switchMap} from 'rxjs/operators';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {ElectionFilterBase} from '../election-filter-base';

@Component({
  selector: 'app-assembly-detail',
  templateUrl: './assembly-detail.component.html',
  styleUrls: ['./assembly-detail.component.styl']
})
export class AssemblyDetailComponent extends ElectionFilterBase implements OnInit {

  faSearch = faSearch;

  constructor(
    route: ActivatedRoute,
    router: Router,
    service: ElectionsService
  ) {
    super(route, router, service);
  }

  ngOnInit(): void {
    // when the 'assembly_code' changes, refresh all the data
    this.currentAssembly$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const code = params.get('assembly_code');
        return code ? this.service.assembly(code) : EMPTY;
      })
    );

    this.currentAssembly$.subscribe(item => {
      this.currentCode$ = item.code;

      this.currentElection$ = this.service.election(item.electionCode);
      this.availableParties$ = this.service.partiesForAssembly(this.currentCode$);
      this.availableElectorates$ = this.service.electoratesForAssembly(this.currentCode$);
      this.availableCandidates$ = this.service.candidatesForAssembly(this.currentCode$);

      this.updateDisplay();
    });
  }

  updateFilter(searchValue: string) {
    this.displayFilter$ = searchValue ? searchValue : '';
    this.updateDisplay();
  }

  updateDisplay(): void {
    const matchingParties = this.service.entitiesTitleDisplay(this.availableParties$, this.displayFilter$);
    const matchingElectorates = this.service.entitiesTitleDisplay(this.availableElectorates$, this.displayFilter$);
    const matchingCandidates = this.service.entitiesNameDisplay(this.availableCandidates$, this.displayFilter$);

    this.filteredParties$ = this.service.entitiesLimit(matchingParties);
    this.filteredElectorates$ = this.service.entitiesLimit(matchingElectorates);
    this.filteredCandidates$ = this.service.entitiesLimit(matchingCandidates);
  }

}
