from typing import Dict, Any, Iterable
from xml.etree import ElementTree

from process_base import ProcessBase


class ProcessAuQld(ProcessBase):
    _election_country = 'Australia'
    _election_institution = 'Queensland Parliament'
    _election_administrative_area_name = 'Queensland'
    _assembly_abbr = 'l'
    _assembly_title = 'Legislative Assembly of Queensland'

    def _load_raw(self, file_path: str) -> Iterable[Dict[str, Any]]:
        return self._read_xml(file_path)

    def _load_input(self, file_path: str) -> Dict[str, Any]:
        return self._read_json(file_path)

    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        return result

    def _parse(self, election_code: str, raw_data: ElementTree):

        result = {
            'election': {
                'title': raw_data.attrib['name'] if raw_data else '',
                'institution': self._election_institution,
                'description': '',
                'location': {
                    'country': self._election_country,
                    'locality_name': '',
                    'administrative_area_name': self._election_administrative_area_name,
                },
                'dates': {
                    'year': self._election_year,
                    'month': self._election_month,
                    'day': self._election_day,
                },
                'codes': {
                    'election': election_code,
                    'assemblies': [],
                    'parties': [],
                },
                'notes': [],
            },
            'assemblies': [{
                'title': self._assembly_title,
                'description': '',
                'codes': {
                    'assembly': self._create_code(election_code, self._assembly_abbr),
                    'election': election_code,
                    'electorates': [],
                },
                'notes': [],
            }],
            'electorates': [],
            'ballot_entries': [],
            'parties': [],
            'candidates': [],
        }

        election = result['election']
        assembly = result['assemblies'][0]

        print('Building data for {}'.format(election_code))

        if not raw_data:
            return result

        for party_item in raw_data.find('parties'):
            party_code = self._create_code(election_code, party_item.get('code'))
            party_name = party_item.get('name').title()

            result['parties'].append({
                'title': party_name or self._unknown_party,
                'description': '',
                'codes': {
                    'candidates': [],
                    'party': party_code,
                    'election': election_code,
                },
                'notes': [],
            })

        # add items to the respective lists if the items doesn't already exist
        for district in raw_data.find('districts'):
            name = district.get('name').title()

            for candidate in district.find('candidates'):
                ballot_order_number = candidate.get('ballotOrderNumber')
                party_name = candidate.get('party')
                name_first = candidate.find('givenNames').text
                name_last = candidate.find('surname').text

                assembly_code = self._create_code(election_code, self._assembly_abbr)
                electorate_code = self._create_code(assembly_code, name or self._unknown_electorate)
                party_code = self._create_code(election_code, party_name or self._unknown_party)
                ballot_code = self._create_code(electorate_code, ballot_order_number or self._unknown_ballot_entry)
                candidate_code = self._create_code(ballot_code, name_last, name_first or self._unknown_candidate)

                party = next(i for i in result['parties'] if i['codes']['party'] == party_code)

                if all(i['codes']['electorate'] != electorate_code for i in result['electorates']):
                    electorate = {
                        'title': name or self._unknown_electorate,
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
                        'position': ballot_order_number,
                        'codes': {
                            'ballot_entry': ballot_code,
                            'election': election_code,
                            'assembly': assembly_code,
                            'electorate': electorate_code,
                            'candidate': candidate_code,
                            'party': party_code,
                        }
                    })

                if all(i['codes']['candidate'] != candidate_code for i in result['candidates']):
                    result['candidates'].append({
                        'description': '',
                        'occupation': '',
                        'name': {
                            'last': (name_last or '').title() or self._unknown_candidate,
                            'first': (name_first or '').title(),
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
                            'phone_work': '',
                            'phone_home': '',
                            'phone_mobile': '',
                            'fax': '',
                            'email': '',
                            'address': '',
                            'post': '',
                        },
                        'notes': []
                    })

                # add the codes to the respective lists
                self._add_codes(election, assembly, assembly_code, party, party_code,
                                electorate, electorate_code, candidate_code)

        return result
