import { Component, OnInit } from '@angular/core';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {AssemblyModel} from '../models/assembly';
import {ElectionsService} from '../elections.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-assembly-results',
  templateUrl: './assembly-results.component.html',
  styleUrls: ['./assembly-results.component.css']
})
export class AssemblyResultsComponent implements OnInit {
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
