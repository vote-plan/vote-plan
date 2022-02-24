import {Component, OnInit} from '@angular/core';
import {ElectorateModel} from '../models/electorate';
import {ElectionsService} from '../elections.service';
import {ActivatedRoute} from '@angular/router';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-electorate-results',
  templateUrl: './electorate-results.component.html',
  styleUrls: ['./electorate-results.component.css']
})
export class ElectorateResultsComponent implements OnInit {
  faWarning = faExclamation;
  electorate!: ElectorateModel | undefined;

  constructor(private service: ElectionsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const electionCode = routeParams.get('electionCode');
    const electorateCode = routeParams.get('electorateCode');
    this.service.getElectorate(electionCode, electorateCode).subscribe(x => this.electorate = x);
  }
}
