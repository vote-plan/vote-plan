import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Assembly} from './assembly';
import {Candidate} from './candidate';
import {Party} from './party';
import {Electorate} from './electorate';
import {Election} from './election';
import {Observable} from 'rxjs';
import {concatMap, first, map, retry} from 'rxjs/operators';
import {BallotEntry} from './ballot-entry';
import {BallotSection} from './ballot-section';

interface ElectionsAttributes {
  elections: Election[];
  assemblies: Assembly[];
  electorates: Electorate[];
  candidates: Candidate[];
  parties: Party[];
  ballotEntries: BallotEntry[];
  ballotSections: BallotSection[];
}

interface TitleDescriptionFilter {
  title: string;
  description: string;
}

interface NamesBallotFilter {
  nameFirst: string;
  nameLast: string;
  ballotEntryCode: string;
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
   *
   * @param code The original code.
   * @return The election code.
   */
  private static electionCode(code: string): string {
    const codeItems = code.split('-');
    return codeItems.slice(0, 6).join('-');
  }

  /**
   * Retrieve all elections.
   *
   * @param electionCode The optional election code.
   * @return All available elections.
   */
  elections(electionCode: string | null = null): Observable<Election[]> {
    if (electionCode) {
      return this.electionsLoad()
        .pipe(map(items =>
          items.filter(v => v.code === electionCode)
        ));
    } else {
      return this.electionsLoad();
    }
  }

  /**
   * Retrieve an election.
   *
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
   *
   * @param election The election to compare
   * @param searchValue The search string
   * @return True if the election matches the search string, otherwise false
   */
  electionFilter(election: Election, searchValue: string): boolean {
    if (!searchValue) {
      return true;
    }
    const needles = searchValue.toUpperCase().split(' ');
    const electionDate = election.held;

    const monthOptions = {month: 'long'};
    const weekdayOptions = {weekday: 'long'};
    const haystack = [
      election.title,
      election.description,
      election.locationCode,
      election.institution,
      election.held?.toUTCString(),
      electionDate.toLocaleString('en-AU', monthOptions),
      electionDate.toLocaleString('en-AU', weekdayOptions),
    ]
      // ensure haystack includes only truth-ish values
      .filter(i => i).map(i => i.toUpperCase());

    // every needle must be present in the haystack
    return needles.every(n => haystack.some(h => h.includes(n)));
  }

  /**
   * Sort elections so that the upcoming elections are first (with closest sorted first),
   * and past elections are next (in chronological order).
   *
   * @param a First election
   * @param b Second election
   * @return compare result
   */
  electionsCompare(a: Election, b: Election): number {
    const dateNow = new Date();
    const dateA = a.held;
    const dateB = b.held;

    /*
   * If compareFunction(a, b) returns less than 0, sort a to an index lower than b (i.e. a comes first).
   * If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other,
   * but sorted with respect to all different elements. Note: the ECMAscript standard does not guarantee this behavior,
   * thus, not all browsers respect this.
   * If compareFunction(a, b) returns greater than 0, sort b to an index lower than a (i.e. b comes first).
   * compareFunction(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments.
   * If inconsistent results are returned, then the sort order is undefined.
   */

    // if a's date is after now, and b's date is before now, a comes before b
    if (dateA > dateNow && dateB < dateNow) {
      return -1;
    }

    // if a's date is before now, and b's date is after now, a comes after b
    if (dateA < dateNow && dateB > dateNow) {
      return 1;
    }

    // if both are in the future, sort upcoming higher
    if (dateA > dateNow && dateB > dateNow && dateA < dateB) {
      return -1;
    } else if (dateA > dateNow && dateB > dateNow && dateA >= dateB) {
      return 1;
    }

    // otherwise put more recent dates earlier
    if (dateA > dateB) {
      return -1;
    } else {
      return 1;
    }
  }

  /**
   * Get a string representing the location for this election.
   *
   * @param election The election.
   */
  electionLocationText(election: Election): string {
    // election.locationCode
    // return [
    //   election.locationLocalityName,
    //   election.locationAdministrativeAreaName,
    //   election.locationCountry
    // ].filter(i => i).join(', ');
    return '';
  }

  assembliesForElection(electionCode: string): Observable<Assembly[]> {
    return this.electionLoad(
      electionCode
    ).pipe(
      map(data => data.assemblies.filter(item => item.electionCode === electionCode)),
    );
  }

  assembliesForParty(partyCode: string): Observable<Assembly[]> {
    return this.electionLoad(
      partyCode
    ).pipe(
      map(data => {
        // get the assemblies that have candidates in the given party
        const parties = data.parties.filter(item => item.code === partyCode).map(item => item.code);
        const assemblyCodes = data.candidates.filter(item => parties.includes(item.partyCode)).map(item => item.assemblyCode);
        return data.assemblies.filter(item => assemblyCodes.includes(item.code));
      })
    );
  }

  /**
   * Retrieve an assembly.
   *
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
      map(data => data.electorates.filter(electorate => electorate.assemblyCode === assemblyCode)),
    );
  }

  electoratesForElection(electionCode: string): Observable<Electorate[]> {
    return this.electionLoad(
      electionCode
    ).pipe(
      map(data => data.electorates.filter(electorate => electorate.electionCode === electionCode)),
    );
  }

  electoratesForParty(partyCode: string): Observable<Electorate[]> {
    return this.electionLoad(
      partyCode
    ).pipe(
      map(data => {
        // get the electorates that have candidates in the given party
        const parties = data.parties.filter(item => item.code === partyCode).map(item => item.code);
        const electorateCodes = data.candidates.filter(item => parties.includes(item.partyCode)).map(item => item.electorateCode);
        return data.electorates.filter(item => electorateCodes.includes(item.code));
      }),
    );
  }

  /**
   * Retrieve an electorate.
   *
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
      map(data => data.candidates.filter(item => item.assemblyCode === assemblyCode)),
    );
  }

  candidatesForParty(partyCode: string): Observable<Candidate[]> {
    return this.electionLoad(
      partyCode
    ).pipe(
      map(data => data.candidates.filter(item => item.partyCode === partyCode)),
    );
  }

  candidatesForElection(electionCode: string): Observable<Candidate[]> {
    return this.electionLoad(
      electionCode
    ).pipe(
      map(data => data.candidates.filter(item => item.electionCode === electionCode)),
    );
  }

  candidatesForElectorate(electorateCode: string): Observable<Candidate[]> {
    return this.electionLoad(
      electorateCode
    ).pipe(
      map(data => data.candidates.filter(item => item.electorateCode === electorateCode)),
    );
  }

  /**
   * Retrieve a candidate.
   *
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
      map(data => data.parties.filter(item => item.electionCode === electionCode)),
    );
  }

  partiesForAssembly(assemblyCode: string): Observable<Party[]> {
    return this.electionLoad(
      assemblyCode
    ).pipe(
      map(data => {
        // get the parties that have candidates in the given assembly
        const candidates = data.candidates.filter(item => item.assemblyCode === assemblyCode);
        const parties = candidates.map(item => item.partyCode);
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
        const candidates = data.candidates.filter(item => item.electorateCode === electorateCode);
        const parties = candidates.map(item => item.partyCode);
        return data.parties.filter(item => parties.includes(item.code));
      }),
    );
  }

  /**
   * Retrieve a party.
   *
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

  ballotSection(code: string): Observable<BallotSection> {
    return this.electionLoad(
      code
    ).pipe(
      map(data => data.ballotSections),
      concatMap(item => item),
      first(item => item.code === code)
    );
  }

  entitiesTitleDisplay<T extends TitleDescriptionFilter>(values: Observable<T[]>, searchValue: string | null = null): Observable<T[]> {
    const searchValueUpper = searchValue ? searchValue.toUpperCase() : '';
    const needles = searchValueUpper.split(' ').filter(i => i);
    return values.pipe(
      map(items => items.filter(item => {
        const haystack = [item.title, item.description].filter(i => i).map(i => i.toUpperCase());
        return needles.length > 0 ? needles.every(n => haystack.some(h => h.includes(n))) : true;
      })),
      map(items => items.sort((a, b) =>
        (a.title ? a.title.toString().toUpperCase() : '').localeCompare(b.title ? b.title.toString().toUpperCase() : ''))),
    );
  }

  /**
   * Get the display name for an entity.
   *
   * @param values
   * @param searchValue
   */
  entitiesNameDisplay<T extends NamesBallotFilter>(values: Observable<T[]>, searchValue?: string): Observable<T[]> {
    const searchValueUpper = searchValue ? searchValue.toUpperCase() : '';
    const needles = searchValueUpper.split(' ').filter(i => i);
    return values.pipe(
      map(items => items.filter(item => {
        const haystack = [
          item.nameFirst,
          item.nameLast,
          item.ballotEntryCode,
          item.description,
        ].filter(i => i).map(i => i.toUpperCase());
        return needles.length > 0 ? needles.every(n => haystack.some(h => h.includes(n))) : true;
      })),
      map(items => items.sort((a, b) =>
        (a.nameLast ? a.nameLast.toString().toUpperCase() : '').localeCompare(b.nameLast ? b.nameLast.toString().toUpperCase() : ''))),
    );
  }

  entitiesLimit<T>(values: Observable<T[]>): Observable<T[]> {
    return values.pipe(map(items => items.slice(0, this.maxItems)));
  }

  /**
   * Load the list of elections.
   */
  private electionsLoad(): Observable<Election[]> {
    return this.http.get<Election[]>(
      '/assets/elections.json'
    ).pipe(
      retry(3)
    );
  }

  /**
   * Load an election.
   *
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
