import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Assembly} from './assembly';
import {Candidate} from './candidate';
import {Party} from './party';
import {Electorate} from './electorate';
import {Election} from './election';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectionsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getElection(electionCode: string): Observable<Election> {
    return new Observable<Election>();
  }

  getAssembly(assemblyCode: string): Observable<Assembly> {
    return new Observable<Assembly>();
  }

  getElectorate(electorateCode: string): Observable<Electorate> {
    return new Observable<Electorate>();
  }

  getCandidate(candidateCode: string): Observable<Candidate> {
    return new Observable<Candidate>();
  }

  getParty(partyCode: string): Observable<Party> {
    return new Observable<Party>();
  }
}
