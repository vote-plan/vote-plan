import { Component, OnInit } from '@angular/core';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {ElectionsService} from '../elections.service';
import {ActivatedRoute} from '@angular/router';
import {AssemblyModel} from '../models/assembly';

@Component({
  selector: 'app-assembly-plan',
  templateUrl: './assembly-plan.component.html',
  styleUrls: ['./assembly-plan.component.css']
})
export class AssemblyPlanComponent implements OnInit {
  faWarning = faExclamation;
  assembly!: AssemblyModel | undefined;

  constructor(private service: ElectionsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const electionCode = routeParams.get('electionCode');
    const assemblyCode = routeParams.get('assemblyCode');
    this.service.getAssembly(electionCode, assemblyCode).subscribe(x => this.assembly = x);
  }

}
