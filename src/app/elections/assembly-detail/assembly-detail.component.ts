import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AssemblyContract} from '../models/assembly';
import {ElectionContract} from '../models/election';
import {ElectionsService} from '../elections.service';

@Component({
  selector: 'app-assembly-detail',
  templateUrl: './assembly-detail.component.html',
  styleUrls: ['./assembly-detail.component.css']
})
export class AssemblyDetailComponent implements OnInit {
  election!: ElectionContract | undefined;
  assembly!: AssemblyContract | undefined;

  constructor(private service: ElectionsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const electionCode = this.route.snapshot.paramMap.get('electionCode')!;
    this.service.getElection(electionCode).subscribe(election => this.election = election);

    const assemblyCode = this.route.snapshot.paramMap.get('assemblyCode')!;
    this.service.getAssembly(electionCode, assemblyCode).subscribe(assembly => this.assembly = assembly);
  }

}
