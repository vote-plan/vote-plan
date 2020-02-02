import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-elections-home',
  templateUrl: './elections-home.component.html',
  styleUrls: ['./elections-home.component.css']
})
export class ElectionsHomeComponent implements OnInit {

  faSearch = faSearch;

  constructor() {
  }

  ngOnInit() {
  }

}
