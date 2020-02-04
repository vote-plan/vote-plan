import { Component, OnInit } from '@angular/core';
import { Electorate } from '../electorate';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-vote-home',
  templateUrl: './vote-home.component.html',
  styleUrls: ['./vote-home.component.css']
})
export class VoteHomeComponent implements OnInit {

  electorate: Electorate;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const electorateCode = params.get('electorate_code');
        return this.service.electorate(electorateCode);
      })
    ).subscribe(electorate => {
      this.electorate = electorate;
    });
  }
}
