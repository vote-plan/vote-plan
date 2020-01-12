from typing import Dict, Any, Iterable

from . import ProcessBase


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
            if 'code' not in result['election']:
                result['election'] = {
                    'code': election_code,
                    'title': row['txn_nm'],
                    'country': self._election_country,
                    'institution': self._election_institution,
                    'description': '',
                    'locality_name': '',
                    'administrative_area_name': self._election_administrative_area_name,
                    'year': self._election_year,
                    'month': self._election_month,
                    'day': self._election_day,
                    'assembly_codes': [],
                    'party_codes': [],
                    'links': {},
                }
            election = result['election']

            if all(i['code'] != assembly_code for i in result['assemblies']):
                assembly = {
                    'code': assembly_code,
                    'title': (self._assembly_house_of_reps if assembly_code.endswith('h') else self._assembly_senate),
                    'election_code': election_code,
                    'electorate_codes': [],
                    'description': '',
                    'links': {},
                }
                result['assemblies'].append(assembly)
            else:
                assembly = next(i for i in result['assemblies'] if i['code'] == assembly_code)

            if all(i['code'] != electorate_code for i in result['electorates']):
                electorate = {
                    'code': electorate_code,
                    'title': row['div_nm'] or row['state_ab'] or self._unknown_electorate,
                    'election_code': election_code,
                    'description': '',
                    'assembly_code': assembly_code,
                    'candidate_codes': [],
                    'links': {},
                }
                result['electorates'].append(electorate)
            else:
                electorate = next(i for i in result['electorates'] if i['code'] == electorate_code)

            if all(i['code'] != ballot_code for i in result['ballots']):
                result['ballots'].append({
                    'code': ballot_code,
                    'election_code': election_code,
                    'assembly_code': assembly_code,
                    'electorate_code': electorate_code,
                    'candidate_code': candidate_code,
                    'party_code': party_code,
                    'position': row['ballot_position'],
                    'name': row['div_nm'] or row['ticket'] or self._unknown_ballot_entry,
                })

            if all(i['code'] != party_code for i in result['parties']):
                party = {
                    'election_code': election_code,
                    'code': party_code,
                    'title': row['party_ballot_nm'] or self._unknown_party,
                    'candidate_codes': [],
                    'description': '',
                    'links': {},
                }
                result['parties'].append(party)
            else:
                party = next(i for i in result['parties'] if i['code'] == party_code)

            if all(i['code'] != candidate_code for i in result['candidates']):
                result['candidates'].append({
                    'code': candidate_code,
                    'election_code': election_code,
                    'assembly_code': assembly_code,
                    'electorate_code': electorate_code,
                    'ballot_code': ballot_code,
                    'party_code': party_code,
                    'name_last': (row['surname'] or '').title() or self._unknown_candidate,
                    'name_first': (row['ballot_given_nm'] or '').title(),
                    'occupation': row['occupation'],
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
                    ] if i]),
                    'phone_work': (row['contact_work_ph'] or '').lower(),
                    'phone_home': (row['contact_home_ph'] or '').lower(),
                    'phone_mobile': (row['contact_mobile_no'] or '').lower(),
                    'fax': (row['contact_fax'] or '').lower(),
                    'email': (row['contact_email'] or '').lower(),
                    'description': '',
                    'links': {},
                })

            # add the codes to the respective lists
            if assembly_code not in election['assembly_codes']:
                election['assembly_codes'].append(assembly_code)

            if party_code not in election['party_codes']:
                election['party_codes'].append(party_code)

            if electorate_code not in assembly['electorate_codes']:
                assembly['electorate_codes'].append(electorate_code)

            if candidate_code not in electorate['candidate_codes']:
                electorate['candidate_codes'].append(candidate_code)

            if candidate_code not in party['candidate_codes']:
                party['candidate_codes'].append(candidate_code)
