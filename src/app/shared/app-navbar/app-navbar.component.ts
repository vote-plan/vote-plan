import {Component, OnInit} from '@angular/core';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  faEdit = faEdit;
  isMenuCollapsed = true;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  navCurrentIsAbout() {
    return this.router.isActive('/about', false);
  }
  navCurrentIsNews() {
    return this.router.isActive('/news', false);
  }

  navCurrentIsElectionsHome() {
    return this.router.isActive('/', true);
  }

  navCurrentIsElectionsList() {
    return this.router.isActive('/elections', true);
  }

  navCurrentIsElectionDetail() {
    return this.router.isActive('/election/', false);
  }

  navCurrentIsAssemblyDetail() {
    return this.router.isActive('/assembly/', false);
  }

  navCurrentIsElectorateDetail() {
    return this.router.isActive('/electorate/', false);
  }

  navCurrentIsCandidateDetail() {
    return this.router.isActive('/candidate/', false);
  }

  navCurrentIsPartyDetail() {
    return this.router.isActive('/party/', false);
  }

  navCurrentIsNotFound() {
    return [
      this.navCurrentIsAbout(),
      this.navCurrentIsAssemblyDetail(),
      this.navCurrentIsCandidateDetail(),
      this.navCurrentIsElectionDetail(),
      this.navCurrentIsElectionsHome(),
      this.navCurrentIsElectionsList(),
      this.navCurrentIsElectorateDetail(),
      this.navCurrentIsPartyDetail()
    ].every(value => value === false);
  }
}
