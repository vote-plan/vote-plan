import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ElectionsService} from '../elections.service';
import {switchMap} from 'rxjs/operators';
import {Electorate} from '../electorate';

@Component({
  selector: 'app-electorate-detail',
  templateUrl: './electorate-detail.component.html',
  styleUrls: ['./electorate-detail.component.css']
})
export class ElectorateDetailComponent implements OnInit {

  electorate: Electorate;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getElectorate(params.get('electorate_code')))
    ).subscribe(electorate => this.electorate = electorate);
  }

}
