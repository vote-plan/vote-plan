import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  faEdit = faEdit;
  isMenuCollapsed = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }



}
