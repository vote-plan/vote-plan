import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {EMPTY, Observable} from 'rxjs';
import {Election} from '../election';
import {debounceTime, map} from 'rxjs/operators';
import {ElectionsService} from '../elections.service';
import {MessageService} from '../../main/message.service';

@Component({
  selector: 'app-elections-home',
  templateUrl: './elections-home.component.html',
  styleUrls: ['./elections-home.component.styl']
})
export class ElectionsHomeComponent implements OnInit {

  faSearch = faSearch;

  elections$: Observable<Election[]>;
  electionsDisplayed$: Observable<Election[]>;
  electionsFilter: string;

  constructor(
    private service: ElectionsService,
    private messageService: MessageService
  ) {

    this.elections$ = EMPTY;
    this.electionsDisplayed$ = EMPTY;
    this.electionsFilter = '';
  }

  ngOnInit() {
    this.elections$ = this.service.elections();
    this.updateElections();
  }

  getElectionDate(election: Election): Date {
    return election.held;
  }

  getElectionLocationText(election: Election): string {
    return this.service.electionLocationText(election);
  }

  updateFilter(searchValue: string) {
    this.electionsFilter = searchValue ? searchValue : '';
    this.updateElections();
  }

  updateElections(): void {
    this.electionsDisplayed$ = this.elections$.pipe(
      // only change display every 0.8 seconds
      debounceTime(0.8),

      // filter the elections array to contain only elections that match the search
      // don't filter if the search is empty or null
      map(elections => elections.filter(election => this.service.electionFilter(election, this.electionsFilter))),

      // display elections in a useful order
      map(elections => elections.sort((a, b) => this.service.electionsCompare(a, b))),

      // restrict to max 12 elections showing at once
      map(elections => elections.slice(0, 12))
    );
  }
}
