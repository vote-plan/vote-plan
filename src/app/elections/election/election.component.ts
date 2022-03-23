import { Component, OnInit } from '@angular/core';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {ElectionModel} from '../models/election';
import {ElectionsService} from '../elections.service';
import {ActivatedRoute} from '@angular/router';
import {ElectorateModel} from '../models/electorate';
import {AssemblyModel} from '../models/assembly';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {
  faWarning = faExclamation;
  election!: ElectionModel | undefined;
  assemblies: AssemblyModel[] | undefined  = [];
  electorates: ElectorateModel[] | undefined  = [];

  constructor(private service: ElectionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const electionCode = routeParams.get('electionCode') ?? undefined;
    this.service.getElection(electionCode).subscribe(i => this.election = i);
    this.service.getAssemblies(electionCode).subscribe(i => this.assemblies = i);
    this.service.getElectorates(electionCode).subscribe(i => this.electorates = i);
  }

  getElectorateAssembly(assemblyCode: string) : AssemblyModel | undefined {
    return this.assemblies?.find(i => i.code == assemblyCode)
  }
}
