from typing import Dict, Any, Iterable

from process_base import ProcessBase


class ProcessAuNat(ProcessBase):
    _election_country = 'Australia'
    _election_institution = 'Parliament of Australia'
    _election_administrative_area_name = 'Federal'
    _assembly_house_of_reps = 'House of Representatives'
    _assembly_senate = 'Senate'

    def _load_raw(self, file_path: str) -> Iterable[Dict[str, Any]]:
        return self._read_csv(file_path)

    def _load_input(self, file_path: str) -> Dict[str, Any]:
        return self._read_json(file_path)

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
            if 'codes' not in result['election'] or 'election' not in result['election']['codes']:
                result['election'] = {
                    'title': row['txn_nm'],
                    'institution': self._election_institution,
                    'description': '',
                    'date': {
                        'year': self._election_year,
                        'month': self._election_month,
                        'day': self._election_day,
                    },
                    'location': {
                        'administrative_area_name': self._election_administrative_area_name,
                        'locality_name': '',
                        'country': self._election_country,
                    },
                    'codes': {
                        'election': election_code,
                        'assemblies': [],
                        'parties': [],
                    },
                    'notes': []
                }
            election = result['election']

            if all(i['codes']['assembly'] != assembly_code for i in result['assemblies']):
                assembly = {
                    'title': (self._assembly_house_of_reps if assembly_code.endswith('h') else self._assembly_senate),
                    'description': '',
                    'codes': {
                        'election': election_code,
                        'electorates': [],
                        'assembly': assembly_code,
                    },
                    'notes': [],
                }
                result['assemblies'].append(assembly)
            else:
                assembly = next(i for i in result['assemblies'] if i['codes']['assembly'] == assembly_code)

            if all(i['codes']['electorate'] != electorate_code for i in result['electorates']):
                electorate = {
                    'title': row['div_nm'] or row['state_ab'] or self._unknown_electorate,
                    'description': '',
                    'codes': {
                        'electorate': electorate_code,
                        'election': election_code,
                        'assembly': assembly_code,
                        'candidates': [],
                    },
                    'notes': [],
                }
                result['electorates'].append(electorate)
            else:
                electorate = next(i for i in result['electorates'] if i['codes']['electorate'] == electorate_code)

            if all(i['codes']['ballot_entry'] != ballot_code for i in result['ballot_entries']):
                result['ballot_entries'].append({
                    'position': row['ballot_position'],
                    'name': row['div_nm'] or row['ticket'] or self._unknown_ballot_entry,
                    'codes': {
                        'ballot_entry': ballot_code,
                        'election': election_code,
                        'assembly': assembly_code,
                        'electorate': electorate_code,
                        'candidate': candidate_code,
                        'party': party_code,
                    },
                    'notes': []
                })

            if all(i['codes']['party'] != party_code for i in result['parties']):
                party = {
                    'title': row['party_ballot_nm'] or self._unknown_party,
                    'description': '',
                    'codes': {
                        'election': election_code,
                        'party': party_code,
                        'candidates': [],
                    },
                    'notes': []
                }
                result['parties'].append(party)
            else:
                party = next(i for i in result['parties'] if i['codes']['party'] == party_code)

            if all(i['codes']['candidate'] != candidate_code for i in result['candidates']):
                result['candidates'].append({
                    'description': '',
                    'occupation': row['occupation'],
                    'name': {
                        'last': (row['surname'] or '').title() or self._unknown_candidate,
                        'first': (row['ballot_given_nm'] or '').title(),
                    },
                    'codes': {
                        'candidate': candidate_code,
                        'election': election_code,
                        'assembly': assembly_code,
                        'electorate': electorate_code,
                        'ballot_entry': ballot_code,
                        'party': party_code,
                    },
                    'contacts': {
                        'phone_work': (row['contact_work_ph'] or '').lower(),
                        'phone_home': (row['contact_home_ph'] or '').lower(),
                        'phone_mobile': (row['contact_mobile_no'] or '').lower(),
                        'fax': (row['contact_fax'] or '').lower(),
                        'email': (row['contact_email'] or '').lower(),
                        'address': ', '.join([i for i in [
                            row['address_1'],
                            row['address_2'],
                            (row['suburb'] or '').title(),
                            row['address_state_ab'],
                            row['postcode']
                        ] if i]),
                        'post': ', '.join([i for i in [
                            row['postal_address_1'],
                            row['postal_address_2'],
                            (row['postal_suburb'] or '').title(),
                            row['postal_state_ab'],
                            row['postal_postcode']
                        ] if i])
                    },
                    'notes': [],
                })

            # add the codes to the respective lists
            self._add_codes(election, assembly, assembly_code, party, party_code,
                            electorate, electorate_code, candidate_code)

        return result
