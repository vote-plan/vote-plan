import {Injectable} from '@angular/core';
import {ElectionModel} from './models/election';
import {map, mergeMap, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DateTime} from 'luxon';
import {AssemblyModel} from './models/assembly';
import {CombinationContract, CombinationModel} from './models/combination';
import {PartyModel} from './models/party';
import {CandidateModel} from './models/candidate';
import {ElectorateModel} from './models/electorate';

@Injectable({
  providedIn: 'root'
})
export class ElectionsService {
  constructor(private httpClient: HttpClient) {
  }

  getCombination(url: string): Observable<CombinationModel | undefined> {
    return this.httpClient.get<CombinationContract>(url).pipe(
      map(i => new CombinationModel(i))
    );
  }

  getElections(): Observable<ElectionModel[]> {
    return this.getCombination('assets/elections.json').pipe(
      tap(i => console.log(i)),
      map(i => i?.elections?.map(e => new ElectionModel(e)) ?? [])
    );
  }

  getElectionsUpcoming(): Observable<ElectionModel[]> {
    const now = DateTime.now();
    return this.getElections().pipe(
      map(elections => elections?.filter(election => election.getDate() >= now)?.sort((a, b) => {
        // dates closer to now should be nearer to the start of the array
        const aDiff = a.getDate().diff(now);
        const bDiff = b.getDate().diff(now);
        if (aDiff > bDiff) {
          return -1;
        }
        if (aDiff < bDiff) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }))
    );
  }

  getElectionsPast(): Observable<ElectionModel[]> {
    const now = DateTime.now();
    return this.getElections().pipe(
      map(elections => elections?.filter(election => election.getDate() < now)?.sort((a, b) => {
        // dates closer to now should be nearer to the start of the array
        const aDiff = a.getDate().diff(now);
        const bDiff = b.getDate().diff(now);
        if (aDiff > bDiff) {
          return -1;
        }
        if (aDiff < bDiff) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }))
    );
  }

  getElection(code: string | undefined): Observable<ElectionModel | undefined> {
    return this.getElections().pipe(
      map(i => i.find(i => i.code == code))
    );
  }

  getElectionByAnyCode(code: string | undefined): Observable<ElectionModel | undefined> {
    const codesSplit = code?.split('-') ?? [];
    const codes = codesSplit.map((value, index, array) => {
      return array.slice(0, index + 1).join('-');
    });
    return this.getElections().pipe(
      map(i => i.find(e => codes.some(x => e.code == x)))
    );
  }

  getAssemblies(electionCode: string | undefined): Observable<AssemblyModel[]> {
    return this.getCombination(`assets/${electionCode}.json`).pipe(
      map(i => i?.assemblies?.map(a => new AssemblyModel(a)) ?? [])
    );
  }

  getAssembly(assemblyCode: string | undefined): Observable<AssemblyModel | undefined> {
    return this.getElectionByAnyCode(assemblyCode).pipe(
      mergeMap(i => this.getAssemblies(i?.code).pipe(
        map(ar => ar?.find(a => a.code == assemblyCode)))
      )
    );
  }

  getParties(electionCode: string | undefined): Observable<PartyModel[]> {
    return this.getCombination(`assets/${electionCode}.json`).pipe(
      map(i => i?.parties?.map(p => new PartyModel(p)) ?? [])
    );
  }

  getParty(partyCode: string | undefined): Observable<PartyModel | undefined> {
    return this.getElectionByAnyCode(partyCode).pipe(
      mergeMap(i => this.getParties(i?.code).pipe(
        map(ar => ar?.find(a => a.code == partyCode)))
      )
    );
  }

  getCandidates(electionCode: string | undefined): Observable<CandidateModel[]> {
    return this.getCombination(`assets/${electionCode}.json`).pipe(
      map(i => i?.candidates?.map(c => new CandidateModel(c)) ?? [])
    );
  }

  getCandidate(candidateCode: string | undefined): Observable<CandidateModel | undefined> {
    return this.getElectionByAnyCode(candidateCode).pipe(
      mergeMap(i => this.getCandidates(i?.code).pipe(
        map(ar => ar?.find(a => a.code == candidateCode)))
      )
    );
  }

  getElectorates(electionCode: string | undefined): Observable<ElectorateModel[]> {
    return this.getCombination(`assets/${electionCode}.json`).pipe(
      map(i => i?.electorates?.map(c => new ElectorateModel(c)) ?? [])
    );
  }

  getElectorate(electorateCode: string | undefined): Observable<ElectorateModel | undefined> {
    return this.getElectionByAnyCode(electorateCode).pipe(
      mergeMap(i => this.getElectorates(i?.code).pipe(
        map(ar => ar?.find(a => a.code == electorateCode)))
      )
    );
  }
}
