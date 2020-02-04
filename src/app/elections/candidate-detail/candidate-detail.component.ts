import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';
import { Candidate } from '../candidate';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {

  candidate$: Observable<Candidate>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) {
  }

  ngOnInit() {
    this.candidate$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.candidate(params.get('candidate_code')))
    );
  }

}
