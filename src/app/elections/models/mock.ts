import {ElectionModel} from './election';

export const ELECTIONS: ElectionModel[] = [
  new ElectionModel({
    code: 'au-2019',
    title: '46th Australian Parliament',
    locationCountry: 'au',
    locationAdministrativeAreaName: '',
    locationLocalityName: '',
    locationDescription: 'national',
    dateYear: 2019,
    dateMonth: 5,
    dateDay: 18,
    dateTimeZone: 'Australia/Canberra',
    notes: [],
    parties: [],
    assemblies: []
  }),
  new ElectionModel({
    code: 'au-2022',
    title: '47th Australian Parliament',
    locationCountry: 'au',
    locationAdministrativeAreaName: '',
    locationLocalityName: '',
    locationDescription: 'national',
    dateYear: 2022,
    dateMonth: 5,
    dateDay: 21,
    dateTimeZone: 'Australia/Canberra',
    notes: [],
    parties: [],
    assemblies: [
      {
        code: 'senate',
        title: 'Senate',
        electorates: [],
        notes: [],
        ballots: [],
      },
      {
        code: 'representatives',
        title: 'House of Representatives',
        electorates: [
          {
            code: 'electorate-1',
            title: 'Electorate 1',
            candidates: [],
            notes: [],
            ballots: [],
          },
        ],
        notes: [],
        ballots: [],
      }
    ]
  }),
  new ElectionModel({
    code: 'au-qld-2020',
    title: 'Parliament of Queensland',
    locationCountry: 'au',
    locationAdministrativeAreaName: 'qld',
    locationLocalityName: '',
    locationDescription: 'state',
    dateYear: 2020,
    dateMonth: 10,
    dateDay: 31,
    dateTimeZone: 'Australia/Brisbane',
    notes: [],
    parties: [],
    assemblies: [
      {
        code: 'legislative',
        title: 'Legislative Assembly of Queensland',
        electorates: [],
        notes: [],
        ballots: [],
      }
    ]
  }),
];
