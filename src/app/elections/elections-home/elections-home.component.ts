import {Component, OnInit} from '@angular/core';
import {ElectionsService} from '../elections.service';
import {Observable} from 'rxjs';
import {ElectionContract} from '../models/election';

@Component({
  selector: 'app-elections-home',
  templateUrl: './elections-home.component.html',
  styleUrls: ['./elections-home.component.css']
})
export class ElectionsHomeComponent implements OnInit {
  elections$!: Observable<ElectionContract[]>;

  constructor(private service: ElectionsService) {
  }

  ngOnInit(): void {
    this.elections$ = this.service.getElections();
  }

}
