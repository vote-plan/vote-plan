import {ElectionModel} from './election';

export const ELECTIONS: ElectionModel[] = [
  new ElectionModel({
    code: 'au-2019',
    title: 'Australian Parliament',
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
];
