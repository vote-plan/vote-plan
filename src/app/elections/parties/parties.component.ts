import { Component, OnInit } from '@angular/core';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {ElectionsService} from '../elections.service';
import {take} from 'rxjs';
import {PartyModel} from '../models/party';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {
  faWarning = faExclamation;
  parties: PartyModel[] = [];

  constructor(private service: ElectionsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const electionCode = routeParams.get('electionCode');
    this.service.getParties(electionCode).pipe(take(10)).subscribe(x => this.parties = x);
  }

}
