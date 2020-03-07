import os
from typing import Dict, Any, List

from process_base import ProcessBase


class ProcessAuWAAdminArea(ProcessBase):
    _election_country = 'Australia'
    _election_coverage_type = 'State'
    _election_institution = 'Parliament'
    _election_administrative_area = 'Western Australia'
    _election_locality = ''
    _assembly_la_abbr = 'la'
    _assembly_la_title = 'Legislative Assembly'
    _assembly_party_indep_names = ['(No Party Designation)', 'Independent']
    _assembly_lc_abbr = 'lc'
    _assembly_lc_title = 'Legislative Council'

    def _load_raw(self, dir_path: str) -> Dict[str, List[Dict[str, Any]]]:
        result = {
            'la': self._load_raw_la(dir_path),
            'lc': self._load_raw_lc(dir_path),
        }

        return result

    def _load_raw_la(self, dir_path: str) -> List[Dict[str, Any]]:
        result = []
        file_path = os.path.join(dir_path, 'legislative-assembly.txt')
        if not os.path.exists(file_path):
            return result
        with open(file_path, 'rt') as f:
            for index, line in enumerate(f):
                line_norm = line.strip()
                line_items = line_norm.split('\t')
                if len(line_items) == 3:
                    candidate_name = [i.strip().title() for i in line_items[0].split(',') if i]
                    party = line_items[1].strip()
                    district = line_items[2].strip()

                    result.append({
                        'name': candidate_name,
                        'party': party,
                        'district': district,
                        'ballot_order': 'b'
                    })

        return result

    def _load_raw_lc(self, dir_path: str) -> List[Dict[str, Any]]:
        result = []
        file_path = os.path.join(dir_path, 'legislative-council.txt')
        if not os.path.exists(file_path):
            return result
        with open(file_path, 'rt') as f:
            current_ballot_order = None
            for index, line in enumerate(f):
                line_norm = line.strip()
                line_items = line_norm.split('\t')
                if len(line_items) == 3:
                    current_ballot_order += 1
                    candidate_name = [i.strip().title() for i in line_items[0].split(',') if i]
                    party = line_items[1].strip()
                    region = line_items[2].strip()

                    result.append({
                        'name': candidate_name,
                        'party': party,
                        'region': region,
                        'ballot_order': current_ballot_order
                    })
                else:
                    current_ballot_order = 0

        return result

    def _parse(self, election_code: str, raw_data: Dict[str, List[Dict[str, Any]]]):
        result = self._empty_result()

        result['elections'].append({
            'title': f'{self._election_year} {self._election_administrative_area} {self._election_coverage_type}',
            'description': '',
            'institution': self._election_institution,
            'locationCountry': self._election_country,
            'locationLocalityName': self._election_locality,
            'locationAdministrativeAreaName': self._election_administrative_area,
            'coverageType': self._election_coverage_type,
            'dateYear': self._election_year,
            'dateMonth': self._election_month,
            'dateDay': self._election_day,
            'code': election_code,
            'assemblies': [],
            'parties': [],
            'notes': [],
        })

        result['assemblies'] = [
            {
                'title': self._assembly_la_title,
                'description': '',
                'code': self._create_code(election_code, self._assembly_la_abbr),
                'election': election_code,
                'electorates': [],
                'notes': [],
            },
            {
                'title': self._assembly_lc_title,
                'description': '',
                'code': self._create_code(election_code, self._assembly_lc_abbr),
                'election': election_code,
                'electorates': [],
                'notes': [],
            }
        ]

        election = result['elections'][0]
        assembly_la = result['assemblies'][0]
        assembly_lc = result['assemblies'][1]

        result['parties'].append({
            'title': 'Independents',
            'description': '',
            'code': self._create_code(election_code, self._independents_party),
            'election': election_code,
            'candidates': [],
            'notes': [],
        })

        if not raw_data:
            return result

        for entry in raw_data['la']:
            self._parse_assembly_entry(result, election, assembly_la, entry['name'], entry['party'], entry['district'],
                                       entry['ballot_order'])

        for entry in raw_data['lc']:
            self._parse_assembly_entry(result, election, assembly_lc, entry['name'], entry['party'], entry['region'],
                                       entry['ballot_order'])

        return result

    def _parse_assembly_entry(self, result, election, assembly, candidate_names, party_name, electorate_name,
                              ballot_order_number) -> None:
        party_code = self._create_code(election['code'], party_name)
        electorate_code = self._create_code(assembly['code'], electorate_name or self._unknown_electorate)
        ballot_code = self._create_code(electorate_code, ballot_order_number or self._unknown_ballot_entry)
        name_first = candidate_names[1]
        name_last = candidate_names[0]
        candidate_code = self._create_code(ballot_code, name_last, name_first or '')

        if all(i['code'] != party_code for i in result['parties']):
            result['parties'].append({
                'title': party_name or self._unknown_party,
                'description': '',
                'candidates': [],
                'code': party_code,
                'election': election['code'],
                'notes': [],
            })

        if all(i['code'] != electorate_code for i in result['electorates']):
            electorate = {
                'title': electorate_name or self._unknown_electorate,
                'description': '',
                'code': electorate_code,
                'election': election['code'],
                'assembly': assembly['code'],
                'candidates': [],
                'notes': [],
            }
            result['electorates'].append(electorate)
        else:
            electorate = next(i for i in result['electorates'] if i['code'] == electorate_code)

        if all(i['code'] != ballot_code for i in result['ballotEntries']):
            result['ballotEntries'].append({
                'position': ballot_order_number,
                'name': '',
                'code': ballot_code,
                'election': election['code'],
                'assembly': assembly['code'],
                'electorate': electorate_code,
                'candidate': candidate_code,
                'party': party_code,
            })

        if all(i['code'] != candidate_code for i in result['candidates']):
            result['candidates'].append({
                'description': '',
                'nameLast': (name_last or '').title() or self._unknown_candidate,
                'nameFirst': (name_first or '').title(),
                'code': candidate_code,
                'election': election['code'],
                'assembly': assembly['code'],
                'electorate': electorate_code,
                'ballotEntry': ballot_code,
                'party': party_code,
                'notes': []
            })

        # add the codes to the respective lists
        party = next(i for i in result['parties'] if i['code'] == party_code)
        self._add_codes(election, assembly, assembly['code'], party, party_code,
                        electorate, electorate_code, candidate_code)
