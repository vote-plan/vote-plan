from typing import Dict, Any, Iterable
from xml.etree import ElementTree

from . import ProcessBase


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
                'code': election_code,
                'title': raw_data.attrib['name'],
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
            },
            'assemblies': [{
                'code': self._create_code(election_code, self._assembly_abbr),
                'title': self._assembly_title,
                'election_code': election_code,
                'electorate_codes': [],
                'description': '',
                'links': {},
            }],
            'electorates': [],
            'ballots': [],
            'parties': [],
            'candidates': [],
        }

        election = result['election']
        assembly = result['assemblies'][0]

        print('Building data for {}'.format(election_code))

        for party_item in raw_data.find('parties'):
            party_code = self._create_code(election_code, party_item.get('code'))
            party_name = party_item.get('name').title()

            result['parties'].append({
                'election_code': election_code,
                'code': party_code,
                'title': party_name or self._unknown_party,
                'candidate_codes': [],
                'description': '',
                'links': {},
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

                party = next(i for i in result['parties'] if i['code'] == party_code)

                if all(i['code'] != electorate_code for i in result['electorates']):
                    electorate = {
                        'code': electorate_code,
                        'title': name or self._unknown_electorate,
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
                        'position': ballot_order_number
                    })

                if all(i['code'] != candidate_code for i in result['candidates']):
                    result['candidates'].append({
                        'code': candidate_code,
                        'election_code': election_code,
                        'assembly_code': assembly_code,
                        'electorate_code': electorate_code,
                        'ballot_code': ballot_code,
                        'party_code': party_code,
                        'name_last': (name_last or '').title() or self._unknown_candidate,
                        'name_first': (name_first or '').title(),
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
