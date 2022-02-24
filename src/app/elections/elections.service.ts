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

  getElection(code: string | null): Observable<ElectionModel | undefined> {
    return this.getElections().pipe(
      map(elections => elections?.find(election => election?.code == code))
    );
  }

  getAssembly(electionCode: string | null, assemblyCode: string | null): Observable<AssemblyModel | undefined> {
    return this.getElection(electionCode).pipe(
      map(election => election?.assemblies?.find(assembly => assembly?.code == assemblyCode)));
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

  getParties(electionCode: string | null) {
    return this.getElection(electionCode).pipe(
      map(election => election?.parties ?? [])
    );
  }

  getCandidates(electionCode: string | null) {
    return this.getElection(electionCode).pipe(
      map(election =>
        election?.assemblies?.flatMap(a =>
          a.electorates?.flatMap(e => e.candidates ?? [])
        ) ?? []
      )
    );
  }

  getElectorate(electionCode: string | null, electorateCode: string | null) {
    return this.getElection(electionCode).pipe(
      map(election => {
          const electorates = election?.assemblies?.map(a =>
            a.electorates?.find(e => e.code == electorateCode)
          );
          return electorates ? electorates[0] : undefined;
        }
      )
    );
  }

  getElectorates(electionCode: string | null) {
    return this.getElection(electionCode).pipe(
      map(election => election?.assemblies?.flatMap(a => a.electorates))
    );
  }
}
