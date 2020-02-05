import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Assembly } from './assembly';
import { Candidate } from './candidate';
import { Party } from './party';
import { Electorate } from './electorate';
import { Election, ElectionInterface } from './election';
import { Observable } from 'rxjs';
import { concatMap, first, map, retry } from 'rxjs/operators';
import { BallotEntry } from './ballot-entry';

interface ElectionsAttributes {
  assemblies: Assembly[];
  ballotEntries: BallotEntry[];
  candidates: Candidate[];
  elections: Election[];
  electorates: Electorate[];
  parties: Party[];
}

interface TitleDescriptionFilter {
  title: string;
  description: string;
}

interface NamesBallotFilter {
  nameFirst: string;
  nameLast: string;
  ballotEntry: string;
  description: string;
}

/**
 * The elections service.
 */
@Injectable({
  providedIn: 'root'
})
export class ElectionsService {

  maxItems = 12;

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Extract the election code from another code.
   * @param code The original code.
   * @return The election code.
   */
  private static electionCode(code: string): string {
    const codeItems = code.split('-');
    return codeItems.slice(0, 6).join('-');
  }

  /**
   * Retrieve all elections.
   * @return All available elections.
   */
  elections(): Observable<Election[]> {
    return this.electionsLoad();
  }

  /**
   * Retrieve an election.
   * @param electionCode The code of the election to retrieve.
   * @return Election matching code or null.
   */
  election(electionCode: string): Observable<Election> {
    return this.electionLoad(
      electionCode
    ).pipe(
      map(data => data.elections),
      concatMap(item => item),
      first(item => item.code === electionCode)
    );
  }

  /**
   * Decide whether an election matches a search string.
   * @param election The election to compare
   * @param searchValue The search string
   * @return True if the election matches the search string, otherwise false
   */
  electionFilter(election: Election, searchValue: string): boolean {
    if (!searchValue) {
      return true;
    }
    const needles = searchValue.toUpperCase().split(' ');
    const electionDate = this.electionDate(election);

    const monthOptions = {month: 'long'};
    const weekdayOptions = {weekday: 'long'};
    const haystack = [
      election.title,
      election.description,
      election.locationCountry,
      election.locationAdministrativeAreaName,
      election.locationLocalityName,
      election.institution,
      election.dateYear.toString(),
      election.dateMonth ? electionDate.toLocaleString('en-AU', monthOptions) : '',
      election.dateMonth ? electionDate.toLocaleString('en-AU', weekdayOptions) : '',
    ]
      // ensure haystack includes only truth-ish values
      .filter(i => i).map(i => i.toUpperCase());

    // every needle must be present in the haystack
    return needles.every(n => haystack.some(h => h.includes(n)));
  }

  /**
   * Sort elections so that the upcoming elections are first (with closest sorted first),
   * and past elections are next (in chronological order)
   * @param a First election
   * @param b Second election
   * @return compare result
   */
  electionsCompare(a: Election, b: Election): number {
    const dateNow = new Date();
    const dateA = this.electionDate(a);
    const dateB = this.electionDate(b);

    /*
   * If compareFunction(a, b) returns less than 0, sort a to an index lower than b (i.e. a comes first).
   * If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other,
   * but sorted with respect to all different elements. Note: the ECMAscript standard does not guarantee this behavior,
   * thus, not all browsers (e.g. Mozilla versions dating back to at least 2003) respect this.
   * If compareFunction(a, b) returns greater than 0, sort b to an index lower than a (i.e. b comes first).
   * compareFunction(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments.
   * If inconsistent results are returned, then the sort order is undefined.
   */

    // if a's date is after now, and b's date is before now, sort a higher than b
    if (dateA > dateNow && dateB < dateNow) {
      return -1;
    }
    // if a's date is before now, and b's date is after now, sort b higher than a
    if (dateA < dateNow && dateB > dateNow) {
      return -1;
    }

    // if both are in the future, sort upcoming higher
    if (dateA > dateNow && dateB > dateNow) {
      if (dateA < dateB) {
        return -1;
      } else {
        return 1;
      }
    }

    // otherwise put more recent dates earlier
    if (dateA > dateB) {
      return -1;
    } else {
      return 1;
    }
  }

  /**
   * Get the election day as a date.
   */
  electionDate(election: Election): Date {
    return new Date(
      election.dateYear,
      election.dateMonth != null ? election.dateMonth - 1 : 0,
      election.dateDay != null ? election.dateDay : 1);
  }

  /**
   * Get a string representing the location for this election.
   * @param election The election.
   */
  electionLocationText(election: Election): string {
    return [
      election.locationLocalityName,
      election.locationAdministrativeAreaName,
      election.locationCountry
    ].filter(i => i).join(', ');
  }

  assembliesForElection(electionCode: string): Observable<Assembly[]> {
    return this.electionLoad(
      electionCode
    ).pipe(
      map(data => data.assemblies.filter(item => item.election === electionCode)),
    );
  }

  assembliesForParty(partyCode: string): Observable<Assembly[]> {
    return this.electionLoad(
      partyCode
    ).pipe(
      map(data => {
        // get the assemblies that have candidates in the given party
        const parties = data.parties.filter(item => item.code === partyCode).map(item => item.code);
        const assemblyCodes = data.candidates.filter(item => parties.includes(item.party)).map(item => item.assembly);
        return data.assemblies.filter(item => assemblyCodes.includes(item.code));
      })
    );
  }

  /**
   * Retrieve an assembly.
   * @param assemblyCode The code of the assembly to retrieve.
   * @return Assembly matching code or null.
   */
  assembly(assemblyCode: string): Observable<Assembly> {
    return this.electionLoad(
      assemblyCode
    ).pipe(
      map(data => data.assemblies),
      concatMap(item => item),
      first(item => item.code === assemblyCode)
    );
  }

  electoratesForAssembly(assemblyCode: string): Observable<Electorate[]> {
    return this.electionLoad(
      assemblyCode
    ).pipe(
      map(data => data.electorates.filter(electorate => electorate.assembly === assemblyCode)),
    );
  }

  electoratesForElection(electionCode: string): Observable<Electorate[]> {
    return this.electionLoad(
      electionCode
    ).pipe(
      map(data => data.electorates.filter(electorate => electorate.election === electionCode)),
    );
  }

  electoratesForParty(partyCode: string): Observable<Electorate[]> {
    return this.electionLoad(
      partyCode
    ).pipe(
      map(data => {
        // get the electorates that have candidates in the given party
        const parties = data.parties.filter(item => item.code === partyCode).map(item => item.code);
        const electorateCodes = data.candidates.filter(item => parties.includes(item.party)).map(item => item.electorate);
        return data.electorates.filter(item => electorateCodes.includes(item.code));
      }),
    );
  }

  /**
   * Retrieve an electorate.
   * @param electorateCode The code of the electorate to retrieve.
   * @return Electorate matching code or null.
   */
  electorate(electorateCode: string): Observable<Electorate> {
    return this.electionLoad(
      electorateCode
    ).pipe(
      map(data => data.electorates),
      concatMap(item => item),
      first(item => item.code === electorateCode)
    );
  }

  candidatesForAssembly(assemblyCode: string): Observable<Candidate[]> {
    return this.electionLoad(
      assemblyCode
    ).pipe(
      map(data => data.candidates.filter(item => item.assembly === assemblyCode)),
    );
  }

  candidatesForParty(partyCode: string): Observable<Candidate[]> {
    return this.electionLoad(
      partyCode
    ).pipe(
      map(data => data.candidates.filter(item => item.party === partyCode)),
    );
  }

  candidatesForElection(electionCode: string): Observable<Candidate[]> {
    return this.electionLoad(
      electionCode
    ).pipe(
      map(data => data.candidates.filter(item => item.election === electionCode)),
    );
  }

  candidatesForElectorate(electorateCode: string): Observable<Candidate[]> {
    return this.electionLoad(
      electorateCode
    ).pipe(
      map(data => data.candidates.filter(item => item.electorate === electorateCode)),
    );
  }

  /**
   * Retrieve a candidate.
   * @param candidateCode The code of the candidate to retrieve.
   * @return Candidate matching code or null.
   */
  candidate(candidateCode: string): Observable<Candidate> {
    return this.electionLoad(
      candidateCode
    ).pipe(
      map(data => data.candidates),
      concatMap(item => item),
      first(item => item.code === candidateCode)
    );
  }

  partiesForElection(electionCode: string): Observable<Party[]> {
    return this.electionLoad(
      electionCode
    ).pipe(
      map(data => data.parties.filter(item => item.election === electionCode)),
    );
  }

  partiesForAssembly(assemblyCode: string): Observable<Party[]> {
    return this.electionLoad(
      assemblyCode
    ).pipe(
      map(data => {
        // get the parties that have candidates in the given assembly
        const candidates = data.candidates.filter(item => item.assembly === assemblyCode);
        const parties = candidates.map(item => item.party);
        return data.parties.filter(item => parties.includes(item.code));
      }),
    );
  }

  partiesForElectorate(electorateCode: string): Observable<Party[]> {
    return this.electionLoad(
      electorateCode
    ).pipe(
      map(data => {
        // get the parties that have candidates in the given electorate
        const candidates = data.candidates.filter(item => item.electorate === electorateCode);
        const parties = candidates.map(item => item.party);
        return data.parties.filter(item => parties.includes(item.code));
      }),
    );
  }

  /**
   * Retrieve a party.
   * @param code The code of the party to retrieve.
   * @return Party matching code or null.
   */
  party(code: string): Observable<Party> {
    return this.electionLoad(
      code
    ).pipe(
      map(data => data.parties),
      concatMap(item => item),
      first(item => item.code === code)
    );
  }

  ballotEntry(code: string): Observable<BallotEntry> {
    return this.electionLoad(
      code
    ).pipe(
      map(data => data.ballotEntries),
      concatMap(item => item),
      first(item => item.code === code)
    );
  }

  entitiesTitleDisplay<T extends TitleDescriptionFilter>(values: Observable<T[]>, searchValue: string = null): Observable<T[]> {
    const searchValueUpper = searchValue ? searchValue.toUpperCase() : '';
    const needles = searchValueUpper.split(' ').filter(i => i);
    return values.pipe(
      map(items => items.filter(item => {
        const haystack = [item.title, item.description].filter(i => i).map(i => i.toUpperCase());
        return needles.length > 0 ? needles.every(n => haystack.some(h => h.includes(n))) : true;
      })),
      map(items => items.sort((a, b) =>
        (a.title ? a.title.toString().toUpperCase() : '').localeCompare(b.title ? b.title.toString().toUpperCase() : ''))),
      map(items => items.slice(0, this.maxItems)),
    );
  }

  entitiesNameDisplay<T extends NamesBallotFilter>(values: Observable<T[]>, searchValue: string = null): Observable<T[]> {
    const searchValueUpper = searchValue ? searchValue.toUpperCase() : '';
    const needles = searchValueUpper.split(' ').filter(i => i);
    return values.pipe(
      map(items => items.filter(item => {
        const haystack = [
          item.nameFirst,
          item.nameLast,
          item.ballotEntry,
          item.description,
        ].filter(i => i).map(i => i.toUpperCase());
        return needles.length > 0 ? needles.every(n => haystack.some(h => h.includes(n))) : true;
      })),
      map(items => items.sort((a, b) =>
        (a.nameLast ? a.nameLast.toString().toUpperCase() : '').localeCompare(b.nameLast ? b.nameLast.toString().toUpperCase() : ''))),
      map(items => items.slice(0, this.maxItems)),
    );
  }

  /**
   * Load the list of elections.
   */
  private electionsLoad(): Observable<Election[]> {
    return this.http.get<ElectionInterface[]>(
      '/assets/elections.json'
    ).pipe(
      retry(3)
    );
  }

  /**
   * Load an election
   * @param code The election code.
   */
  private electionLoad(code: string): Observable<ElectionsAttributes> {
    const electionCode = ElectionsService.electionCode(code);
    return this.http.get<ElectionsAttributes>(
      `/assets/${electionCode}.json`
    ).pipe(
      retry(3)
    );
  }
}
