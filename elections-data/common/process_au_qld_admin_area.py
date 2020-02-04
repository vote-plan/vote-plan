import os
from typing import Dict, Any

from process_base import ProcessBase


class ProcessAuQldAdminArea(ProcessBase):
    _election_country = 'Australia'
    _election_coverage_type = 'State'
    _election_institution = 'Parliament'
    _election_administrative_area = 'Queensland'
    _election_locality = ''
    _assembly_abbr = 'l'
    _assembly_title = 'Legislative Assembly'

    def _load_raw(self, dir_path: str) -> Dict[str, Dict[str, Any]]:
        result = {
            'candidates': self._load_raw_candidates(dir_path),
            'parties': self._load_raw_parties(dir_path),
        }

        return result

    def _load_raw_candidates(self, dir_path: str) -> Dict[str, Any]:
        result = {}
        file_path = os.path.join(dir_path, 'candidates.txt')
        if not os.path.exists(file_path):
            return result
        with open(file_path, 'rt') as f:
            current_electorate = None
            for line in f:
                current_line = line.strip()
                if not current_line or current_line == 'Top':
                    continue
                elif not line.startswith(' \t'):
                    current_electorate = current_line
                    result[current_electorate] = []
                else:
                    if '\t' in current_line:
                        name, party = [i.strip() for i in current_line.split('\t')]
                    else:
                        name = current_line
                        party = None
                    name_last, name_first = [i.strip() for i in name.split(',')]
                    name_last = name_last.title()
                    result[current_electorate].append({
                        'name_first': name_first,
                        'name_last': name_last,
                        'party': party,
                        'order': len(result[current_electorate]) + 1
                    })
        return result

    def _load_raw_parties(self, dir_path: str) -> Dict[str, Any]:
        result = {}
        file_path = os.path.join(dir_path, 'parties.txt')
        if not os.path.exists(file_path):
            return result
        with open(file_path, 'rt') as f:
            party_name = None
            party_abbr = None
            party_officer = None
            party_rego_date = None
            for line in f:
                current_line = line.strip()

                if not current_line:
                    continue

                if current_line.startswith("Name of Political Party"):
                    if party_name:
                        # save current and reset for new
                        result[party_abbr or party_name] = {
                            'name': party_name,
                            'abbr': party_abbr,
                            'officer': party_officer,
                            'rego_date': party_rego_date,
                        }
                        party_name = None
                        party_abbr = None
                        party_officer = None
                        party_rego_date = None
                    party_name = current_line.split('\t')[1].strip()
                elif current_line.startswith("Abbreviation"):
                    party_abbr = current_line.split('\t')[1].strip()
                elif current_line.startswith("Registered Officer"):
                    party_officer = current_line.split('\t')[1].strip()
                elif current_line.startswith("Date of Registration"):
                    party_rego_date = current_line.split('\t')[1].strip()
                else:
                    raise Exception()

            if party_name:
                # include last
                result[party_abbr or party_name] = {
                    'name': party_name,
                    'abbr': party_abbr,
                    'officer': party_officer,
                    'rego_date': party_rego_date,
                }

        return result

    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        return result

    def _parse(self, election_code: str, raw_data: Dict[str, Dict[str, Any]]):
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

        result['assemblies'] = [{
            'title': self._assembly_title,
            'description': '',
            'code': self._create_code(election_code, self._assembly_abbr),
            'election': election_code,
            'electorates': [],
            'notes': [],
        }]

        election = result['elections'][0]
        assembly = result['assemblies'][0]

        if not raw_data:
            return result

        candidates = raw_data['candidates']
        parties = raw_data['parties']

        result['parties'].append({
            'title': 'Independents',
            'description': '',
            'code': self._create_code(election_code, self._independents_party),
            'election': election_code,
            'candidates': [],
            'notes': [],
        })

        for party_name, party_item in parties.items():
            party_code = self._create_code(election_code, party_item.get('abbr') or party_item.get('name'))
            party_name = party_item.get('name').title()

            result['parties'].append({
                'title': party_name or self._unknown_party,
                'description': party_item.get('abbr') or '',
                'candidates': [],
                'code': party_code,
                'election': election_code,
                'notes': [],
            })

        # add items to the respective lists if the items doesn't already exist
        for electorate_name, electorate_item in candidates.items():

            for candidate in electorate_item:
                ballot_order_number = candidate.get('order')
                party_code = self._create_code(
                    election_code, candidate.get('party') or self._independents_party)
                name_first = candidate.get('name_first')
                name_last = candidate.get('name_last')

                assembly_code = self._create_code(election_code, self._assembly_abbr)
                electorate_code = self._create_code(assembly_code, electorate_name or self._unknown_electorate)
                ballot_code = self._create_code(electorate_code, ballot_order_number or self._unknown_ballot_entry)
                candidate_code = self._create_code(ballot_code, name_last, name_first or '')

                party = next(i for i in result['parties'] if i['code'] == party_code)

                if all(i['code'] != electorate_code for i in result['electorates']):
                    electorate = {
                        'title': electorate_name or self._unknown_electorate,
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

                if all(i['code'] != ballot_code for i in result['ballotEntries']):
                    result['ballotEntries'].append({
                        'position': ballot_order_number,
                        'name': '',
                        'code': ballot_code,
                        'election': election_code,
                        'assembly': assembly_code,
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
                        'election': election_code,
                        'assembly': assembly_code,
                        'electorate': electorate_code,
                        'ballotEntry': ballot_code,
                        'party': party_code,
                        'notes': []
                    })

                # add the codes to the respective lists
                self._add_codes(election, assembly, assembly_code, party, party_code,
                                electorate, electorate_code, candidate_code)

        return result
