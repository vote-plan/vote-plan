import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ElectionsService} from '../elections.service';
import {switchMap} from 'rxjs/operators';
import {Assembly} from '../assembly';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-assembly-detail',
  templateUrl: './assembly-detail.component.html',
  styleUrls: ['./assembly-detail.component.css']
})
export class AssemblyDetailComponent implements OnInit {

  assembly: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ElectionsService
  ) { }

  ngOnInit() {
    this.assembly = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getAssembly(params.get('assembly_code')))
    );
  }

}
