import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Election } from '../election';
import { switchMap, take } from 'rxjs/operators';
import { ParamMap } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-elections-home',
  templateUrl: './elections-home.component.html',
  styleUrls: ['./elections-home.component.css']
})
export class ElectionsHomeComponent implements OnInit {

  faSearch = faSearch;
  elections$: Observable<Election[]>;
  electionsFilteredSorted$: Observable<Election[]>;

  constructor(
    private service: ElectionsService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.elections$ = this.service.getElections();
    this.electionsFilteredSorted$ = this.elections$.pipe(
      take(12)
    );
    // todo create a filtered and sorted property (sort by smallest future duration from now, then smallest past duration from now)
    // todo create a property for the filter text box
  }

  getElectionDate(election: Election): Date {
    return new Date(election.dateYear, election.dateMonth, election.dateDay ? election.dateDay : null);
  }

  getElectionLocationText(election: Election): string {
    return [
      election.locationLocalityName,
      election.locationAdministrativeAreaName,
      election.locationCountry
    ].filter(i => i).join(', ');
  }
}
