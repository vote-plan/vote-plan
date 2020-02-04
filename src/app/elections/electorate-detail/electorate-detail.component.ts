import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';
import { Electorate } from '../electorate';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-electorate-detail',
  templateUrl: './electorate-detail.component.html',
  styleUrls: ['./electorate-detail.component.css']
})
export class ElectorateDetailComponent implements OnInit {

  electorate$: Observable<Electorate>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) {
  }

  ngOnInit() {
    this.electorate$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.electorate(params.get('electorate_code')))
    );
  }

}
