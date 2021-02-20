import {EMPTY, Observable, of} from 'rxjs';
import {Assembly} from './assembly';
import {Election} from './election';
import {Party} from './party';
import {Electorate} from './electorate';
import {Candidate} from './candidate';
import {BallotEntry} from './ballot-entry';
import {Note} from './note';
import {BallotSection} from './ballot-section';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ElectionsService} from './elections.service';
import {FormControl} from '@angular/forms';
import {Location} from './location';
import {switchMap} from 'rxjs/operators';
import {ElectionEntity} from './election-entity';

export abstract class ElectionFilterBase {

  /**
   * The text to filter the displayed entities.
   */
  public displayFilter: FormControl;

  /*
   * Internal lists of entities that can be used by a page.
   */
  public allElections$: Observable<Election[]>;
  public allAssemblies$: Observable<Assembly[]>;
  public allElectorates$: Observable<Electorate[]>;
  public allCandidates$: Observable<Candidate[]>;
  public allParties$: Observable<Party[]>;
  public allBallotEntries$: Observable<BallotEntry[]>;
  public allBallotSections$: Observable<BallotSection[]>;
  public allNotes$: Observable<Note[]>;
  public allLocations$: Observable<Location[]>;

  public filteredElections$: Observable<Election[]>;
  public filteredAssemblies$: Observable<Assembly[]>;
  public filteredElectorates$: Observable<Electorate[]>;
  public filteredCandidates$: Observable<Candidate[]>;
  public filteredParties$: Observable<Party[]>;
  public filteredBallotEntries$: Observable<BallotEntry[]>;
  public filteredBallotSections$: Observable<BallotSection[]>;

  public displayedElections$: Observable<Election[]>;
  public displayedAssemblies$: Observable<Assembly[]>;
  public displayedElectorates$: Observable<Electorate[]>;
  public displayedCandidates$: Observable<Candidate[]>;
  public displayedParties$: Observable<Party[]>;
  public displayedBallotEntries$: Observable<BallotEntry[]>;
  public displayedBallotSections$: Observable<BallotSection[]>;

  /**
   * The current entity.
   */
  protected currentEntity$: Observable<ElectionEntity>;

  protected constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected service: ElectionsService
  ) {
    this.allElections$ = of([]);
    this.allAssemblies$ = of([]);
    this.allElectorates$ = of([]);
    this.allCandidates$ = of([]);
    this.allParties$ = of([]);
    this.allBallotEntries$ = of([]);
    this.allBallotSections$ = of([]);
    this.allNotes$ = of([]);
    this.allLocations$ = of([]);

    this.filteredElections$ = of([]);
    this.filteredAssemblies$ = of([]);
    this.filteredElectorates$ = of([]);
    this.filteredCandidates$ = of([]);
    this.filteredParties$ = of([]);
    this.filteredBallotEntries$ = of([]);
    this.filteredBallotSections$ = of([]);

    this.displayedElections$ = of([]);
    this.displayedAssemblies$ = of([]);
    this.displayedElectorates$ = of([]);
    this.displayedCandidates$ = of([]);
    this.displayedParties$ = of([]);
    this.displayedBallotEntries$ = of([]);
    this.displayedBallotSections$ = of([]);

    this.displayFilter = new FormControl('');

    // when the route parameters change, update the currentEntity$, using the observable paramMap
    this.currentEntity$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let result;

        const electionCode = params.get('election_code');
        if (electionCode) {
          this.allElections$ = this.service.elections(electionCode);
          this.allAssemblies$ = this.service.assembliesForElection(electionCode);
          this.allElectorates$ = this.service.electoratesForElection(electionCode);
          this.allCandidates$ = this.service.candidatesForElection(electionCode);
          this.allParties$ = this.service.partiesForElection(electionCode);
          result = this.service.election(electionCode);
        }

        const assemblyCode = params.get('assembly_code');
        if (assemblyCode) {
          this.allElections$ = this.service.elections(assemblyCode);
          this.allAssemblies$ = this.service.assemblies(assemblyCode);
          this.allElectorates$ = this.service.electoratesForAssembly(assemblyCode);
          this.allCandidates$ = this.service.candidatesForAssembly(assemblyCode);
          this.allParties$ = this.service.partiesForAssembly(assemblyCode);
          result = this.service.assembly(assemblyCode);
        }

        const electorateCode = params.get('electorate_code');
        if (electorateCode) {
          result = this.service.electorate(electorateCode);
        }

        const candidateCode = params.get('candidate_code');
        if (candidateCode) {
          result = this.service.candidate(candidateCode);
        }

        const partyCode = params.get('party_code');
        if (partyCode) {
          result = this.service.party(partyCode);
        }

        const ballotSectionCode = params.get('ballot_section_code');
        if (ballotSectionCode) {
          result = this.service.ballotSection(ballotSectionCode);
        }

        return result ? result : EMPTY;
      })
    );

    this.currentEntity$.subscribe(_ => {
      // reset the display filter, so the entities displayed will be updated.
      this.displayFilter.reset();
    });

    this.displayFilter.valueChanges.subscribe(_ => {
      this.filteredElections$ = this.service.entitiesTitleDisplay(this.allElections$, this.displayFilter.value);
      this.filteredAssemblies$ = this.service.entitiesTitleDisplay(this.allAssemblies$, this.displayFilter.value);
      this.filteredElectorates$ = this.service.entitiesTitleDisplay(this.allElectorates$, this.displayFilter.value);
      this.filteredCandidates$ = this.service.entitiesTitleDisplay(this.allCandidates$, this.displayFilter.value);
      this.filteredParties$ = this.service.entitiesTitleDisplay(this.allParties$, this.displayFilter.value);
      this.filteredBallotEntries$ = this.service.entitiesTitleDisplay(this.allBallotEntries$, this.displayFilter.value);
      this.filteredBallotSections$ = this.service.entitiesTitleDisplay(this.allBallotSections$, this.displayFilter.value);

      this.displayedElections$ = this.service.entitiesLimit(this.filteredElections$);
      this.displayedAssemblies$ = this.service.entitiesLimit(this.filteredAssemblies$);
      this.displayedElectorates$ = this.service.entitiesLimit(this.filteredElectorates$);
      this.displayedCandidates$ = this.service.entitiesLimit(this.filteredCandidates$);
      this.displayedParties$ = this.service.entitiesLimit(this.filteredParties$);
      this.displayedBallotEntries$ = this.service.entitiesLimit(this.filteredBallotEntries$);
      this.displayedBallotSections$ = this.service.entitiesLimit(this.filteredBallotSections$);
    });
  }
}
