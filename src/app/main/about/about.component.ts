import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.styl']
})
export class AboutComponent implements OnInit {

  constructor(
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(`About | ${environment.titleSuffix}`);
  }

}
