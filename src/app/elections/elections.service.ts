import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Assembly} from './assembly';
import {Candidate} from './candidate';
import {Party} from './party';
import {Electorate} from './electorate';
import {Election} from './election';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

/**
 * The elections service.
 */
@Injectable({
  providedIn: 'root'
})
export class ElectionsService {

  private localCache: Map<string, object>;

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Retrieve an election.
   * @param code The code of the election to retrieve.
   * @return Election matching code or null.
   */
  getElection(code: string): Observable<Election> {
    return new Observable<Election>();
  }

  /**
   * Retrieve an assembly.
   * @param code The code of the assembly to retrieve.
   * @return Assembly matching code or null.
   */
  getAssembly(code: string): Observable<Assembly> {
    return new Observable<Assembly>();
  }

  /**
   * Retrieve an electorate.
   * @param code The code of the electorate to retrieve.
   * @return Electorate matching code or null.
   */
  getElectorate(code: string): Observable<Electorate> {
    return new Observable<Electorate>();
  }

  /**
   * Retrieve a candidate.
   * @param code The code of the candidate to retrieve.
   * @return Candidate matching code or null.
   */
  getCandidate(code: string): Observable<Candidate> {
    return new Observable<Candidate>();
  }

  /**
   * Retrieve a party.
   * @param code The code of the party to retrieve.
   * @return Party matching code or null.
   */
  getParty(code: string): Observable<Party> {
    return new Observable<Party>();
  }

  /**
   * Load the list of elections.
   */
  private loadElections(): void {
    this.http.get('/assets/elections/elections.json')
      .pipe(
        retry(3),
        catchError(this.handleError)
      ).subscribe(data =>
      console.log('loadElections', data)
    );
  }

  /**
   * Load an election
   * @param code The election code.
   */
  private loadElection(code: string): void {
    this.http.get(`/assets/elections/election-${code}.json`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      ).subscribe(data =>
      console.log('loadElection', data)
    );
  }

  /**
   * Hand an error from a http request.
   * @param error The http error object.
   * @return An observable containing the error.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
