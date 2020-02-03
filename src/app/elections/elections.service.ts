import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Assembly } from './assembly';
import { Candidate } from './candidate';
import { Party } from './party';
import { Electorate } from './electorate';
import { Election } from './election';
import { Observable } from 'rxjs';
import { concatMap, first, map, retry } from 'rxjs/operators';
import { BallotEntry } from './ballot-entry';
import { MessageService } from '../message.service';

interface ElectionsAttributes {
  assemblies: Assembly[];
  ballotEntries: BallotEntry[];
  candidates: Candidate[];
  elections: Election[];
  electorates: Electorate[];
  parties: Party[];
}

/**
 * The elections service.
 */
@Injectable({
  providedIn: 'root'
})
export class ElectionsService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  /**
   * Retrieve all elections.
   * @return All available elections.
   */
  getElections(): Observable<Election[]> {
    return this.loadElections();
  }

  /**
   * Retrieve an election.
   * @param code The code of the election to retrieve.
   * @return Election matching code or null.
   */
  getElection(code: string): Observable<Election> {
    return this.loadElection(
      code
    ).pipe(
      map(data => data.elections),
      concatMap(item => item),
      first(item => item.code === code)
    );
  }

  /**
   * Retrieve an assembly.
   * @param code The code of the assembly to retrieve.
   * @return Assembly matching code or null.
   */
  getAssembly(code: string): Observable<Assembly> {
    return this.loadElection(
      code
    ).pipe(
      map(data => data.assemblies),
      concatMap(item => item),
      first(item => item.code === code)
    );
  }

  /**
   * Retrieve an electorate.
   * @param code The code of the electorate to retrieve.
   * @return Electorate matching code or null.
   */
  getElectorate(code: string): Observable<Electorate> {
    return this.loadElection(
      code
    ).pipe(
      map(data => data.electorates),
      concatMap(item => item),
      first(item => item.code === code)
    );
  }

  /**
   * Retrieve a candidate.
   * @param code The code of the candidate to retrieve.
   * @return Candidate matching code or null.
   */
  getCandidate(code: string): Observable<Candidate> {
    return this.loadElection(
      code
    ).pipe(
      map(data => data.candidates),
      concatMap(item => item),
      first(item => item.code === code)
    );
  }

  /**
   * Retrieve a party.
   * @param code The code of the party to retrieve.
   * @return Party matching code or null.
   */
  getParty(code: string): Observable<Party> {
    return this.loadElection(
      code
    ).pipe(
      map(data => data.parties),
      concatMap(item => item),
      first(item => item.code === code)
    );
  }

  /**
   * Extract the election code from another code.
   * @param code The original code.
   * @return The election code.
   */
  private getElectionCode(code: string): string {
    const codeItems = code.split('-');
    return codeItems.slice(0, 6).join('-');
  }

  /**
   * Load the list of elections.
   */
  private loadElections(): Observable<Election[]> {
    return this.http.get<Election[]>(
      '/assets/elections.json'
    ).pipe(
      retry(3)
    );
  }

  /**
   * Load an election
   * @param code The election code.
   */
  private loadElection(code: string): Observable<ElectionsAttributes> {
    return this.http.get<ElectionsAttributes>(
      `/assets/${code}.json`
    ).pipe(
      retry(3)
    );
  }
}
