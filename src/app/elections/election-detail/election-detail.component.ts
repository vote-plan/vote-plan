import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ElectionsService } from '../elections.service';
import { switchMap } from 'rxjs/operators';
import { Election } from '../election';
import { Observable } from 'rxjs';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-election-detail',
  templateUrl: './election-detail.component.html',
  styleUrls: ['./election-detail.component.css']
})
export class ElectionDetailComponent implements OnInit {

  election$: Observable<Election>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.election$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const result = this.service.getElection(params.get('election_code'));
        this.messageService.debug('ngOnInit', 'election$', result);
        return result;
      })
    );
  }

}
