import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssemblyComponent } from './assembly/assembly.component';
import { ElectorateComponent } from './electorate/electorate.component';
import {ResultsService} from './results.service';



@NgModule({
  declarations: [
    AssemblyComponent,
    ElectorateComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ResultsService,
  ]
})
export class ResultsModule { }
