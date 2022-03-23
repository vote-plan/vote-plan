import {Component, OnInit} from '@angular/core';
import {ElectionsService} from '../elections.service';
import {ActivatedRoute} from '@angular/router';
import {ElectorateModel} from '../models/electorate';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {AssemblyModel} from '../models/assembly';
import {ElectionModel} from '../models/election';

@Component({
  selector: 'app-electorate-plan',
  templateUrl: './electorate-plan.component.html',
  styleUrls: ['./electorate-plan.component.css']
})
export class ElectoratePlanComponent implements OnInit {
  faWarning = faExclamation;
  electorate!: ElectorateModel | undefined;
  assembly!: AssemblyModel | undefined;
  election!: ElectionModel | undefined;

  constructor(private service: ElectionsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const electorateCode = routeParams.get('electorateCode') ?? undefined;
    this.service.getElectionByAnyCode(electorateCode).subscribe(x => this.election = x);
    this.service.getElectorate(electorateCode).subscribe(x => {
      this.electorate = x;
      this.service.getAssembly(x?.assembly_code).subscribe(x => this.assembly = x);
    });
  }

}
