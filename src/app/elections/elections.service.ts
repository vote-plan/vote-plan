import {Injectable} from '@angular/core';
import {ElectionModel} from './models/election';
import {ELECTIONS} from './models/mock';
import {map, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DateTime} from 'luxon';
import {AssemblyModel} from './models/assembly';

@Injectable({
  providedIn: 'root'
})
export class ElectionsService {
  constructor(private httpClient: HttpClient) {
  }

  getElections(): Observable<ElectionModel[]> {
    return of(ELECTIONS);
  }

  getElection(code: string): Observable<ElectionModel | undefined> {
    return this.getElections().pipe(
      map(elections => elections?.find(election => election?.code == code))
    );
  }

  getAssembly(electionCode: string, code: string): Observable<AssemblyModel | undefined> {
    return this.getElection(electionCode).pipe(
      map(election => election?.assemblies?.find(assembly => assembly?.code == code)));
  }

  getElectionsUpcoming(): Observable<ElectionModel[]> {
    const now = DateTime.now();
    return this.getElections().pipe(
      map(elections => elections?.filter(election => election.getDate() >= now))
    );
  }

  getElectionsPast(): Observable<ElectionModel[]> {
    const now = DateTime.now();
    return this.getElections().pipe(
      map(elections => elections?.filter(election => election.getDate() < now))
    );
  }
}
