import os
from typing import Dict, Any, Iterable

from process_base import ProcessBase


class ProcessAuNatCountry(ProcessBase):
    _election_country = 'Australia'
    _election_coverage_type = 'Federal'
    _election_institution = 'Parliament'
    _election_administrative_area = ''
    _election_locality = ''
    _assembly_house_of_reps = 'House of Representatives'
    _assembly_senate = 'Senate'

    def _load_raw(self, file_path: str) -> Iterable[Dict[str, Any]]:
        return self._read_csv(os.path.join(file_path, 'raw-input.csv'))

    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        return result

    def _parse(self, election_code: str, raw_data: Iterable[Dict[str, Any]]):
        result = self._empty_result()

        for row in raw_data:
            # create the various codes for the data items
            assembly_code = self._create_code(
                election_code, row['nom_ty'] or self._unknown_assembly)
            electorate_code = self._create_code(
                assembly_code, row['state_ab'] or self._unknown_electorate, row['div_nm'])
            party_code = self._create_code(
                election_code, row['party_ballot_nm'] or self._unknown_party)
            ballot_code = self._create_code(
                electorate_code, row['ticket'], row['ballot_position'] or self._unknown_ballot_entry)
            candidate_code = self._create_code(
                ballot_code, row['surname'], row['ballot_given_nm'] or self._unknown_candidate)

            # add items to the respective lists if the items doesn't already exist
            # election
            if not result['elections'] or 'code' not in result['elections'][0]:
                result['elections'].append({
                    'title': f'{self._election_year} Australian {self._election_coverage_type}',  # row['txn_nm'],
                    'institution': self._election_institution,
                    'description': '',
                    'locationAdministrativeAreaName': self._election_administrative_area,
                    'locationLocalityName': self._election_locality,
                    'locationCountry': self._election_country,
                    'coverageType': self._election_coverage_type,
                    'dateYear': self._election_year,
                    'dateMonth': self._election_month,
                    'dateDay': self._election_day,
                    'code': election_code,
                    'assemblies': [],
                    'parties': [],
                    'notes': []
                })
            election = result['elections'][0]

            # assembly
            if all(i['code'] != assembly_code for i in result['assemblies']):
                assembly = {
                    'title': (self._assembly_house_of_reps if assembly_code.endswith('h') else self._assembly_senate),
                    'description': '',
                    'code': assembly_code,
                    'election': election_code,
                    'electorates': [],
                    'notes': [],
                }
                result['assemblies'].append(assembly)
            else:
                assembly = next(i for i in result['assemblies'] if i['code'] == assembly_code)

            # electorate
            if all(i['code'] != electorate_code for i in result['electorates']):
                electorate = {
                    'title': row['div_nm'] or row['state_ab'] or self._unknown_electorate,
                    'description': '',
                    'code': electorate_code,
                    'election': election_code,
                    'assembly': assembly_code,
                    'candidates': [],
                    'notes': [],
                }
                result['electorates'].append(electorate)
            else:
                electorate = next(i for i in result['electorates'] if i['code'] == electorate_code)

            # ballot entry
            if all(i['code'] != ballot_code for i in result['ballotEntries']):
                result['ballotEntries'].append({
                    'position': row['ballot_position'],
                    'name': row['div_nm'] or row['ticket'] or self._unknown_ballot_entry,
                    'code': ballot_code,
                    'election': election_code,
                    'assembly': assembly_code,
                    'electorate': electorate_code,
                    'candidate': candidate_code,
                    'party': party_code,
                    'notes': []
                })

            # party
            if all(i['code'] != party_code for i in result['parties']):
                party = {
                    'title': row['party_ballot_nm'] or self._unknown_party,
                    'description': '',
                    'code': party_code,
                    'election': election_code,
                    'candidates': [],
                    'notes': []
                }
                result['parties'].append(party)
            else:
                party = next(i for i in result['parties'] if i['code'] == party_code)

            # candidate
            if all(i['code'] != candidate_code for i in result['candidates']):
                result['candidates'].append({
                    'description': '',
                    'nameLast': (row['surname'] or '').title() or self._unknown_candidate,
                    'nameFirst': (row['ballot_given_nm'] or '').title(),
                    'code': candidate_code,
                    'election': election_code,
                    'assembly': assembly_code,
                    'electorate': electorate_code,
                    'ballotEntry': ballot_code,
                    'party': party_code,
                    'notes': [
                        {'displayText': 'occupation', 'contentText': row['occupation'], 'noteType': 'extra'},

                        {'displayText': 'phone work', 'contentText': (row['contact_work_ph'] or '').lower(),
                         'noteType': 'contact'},
                        {'displayText': 'phone home', 'contentText': (row['contact_home_ph'] or '').lower(),
                         'noteType': 'contact'},
                        {'displayText': 'phone mobile', 'contentText': (row['contact_mobile_no'] or '').lower(),
                         'noteType': 'contact'},
                        {'displayText': 'fax', 'contentText': (row['contact_fax'] or '').lower(),
                         'noteType': 'contact'},
                        {'displayText': 'email', 'contentText': (row['contact_email'] or '').lower(),
                         'noteType': 'contact'},
                        {'displayText': 'address', 'contentText': ', '.join([i for i in [
                            row['address_1'],
                            row['address_2'],
                            (row['suburb'] or '').title(),
                            row['address_state_ab'],
                            row['postcode']
                        ] if i]), 'noteType': 'contact'},
                        {'displayText': 'post', 'contentText': ', '.join([i for i in [
                            row['postal_address_1'],
                            row['postal_address_2'],
                            (row['postal_suburb'] or '').title(),
                            row['postal_state_ab'],
                            row['postal_postcode']
                        ] if i]), 'noteType': 'contact'},
                    ],
                })

            # add the codes to the respective lists
            self._add_codes(election, assembly, assembly_code, party, party_code,
                            electorate, electorate_code, candidate_code)

        return result
