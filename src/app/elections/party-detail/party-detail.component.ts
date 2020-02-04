import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';
import { Party } from '../party';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit {

  party$: Observable<Party>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) {
  }

  ngOnInit() {
    this.party$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.party(params.get('party_code')))
    );
  }
}
