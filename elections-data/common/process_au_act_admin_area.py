import csv
import os
from typing import Any, Dict, List

from process_base import ProcessBase


class ProcessAuActAdminArea(ProcessBase):
    _election_title = 'Territory General Election'
    _election_country = 'Australia'
    _election_institution = 'Legislative Assembly'
    _election_administrative_area = 'Australian Capital Territory'
    _election_locality = ''
    _assembly_abbr = 'l'
    _assembly_title = 'Legislative Assembly'

    def _load_raw(self, file_path: str):
        # Note that AU ACT uses Robinson Rotation,
        # which means that candidates are not always in the same order on the ballot paper.
        # see https://en.wikipedia.org/wiki/Robson_Rotation
        result = {
            'candidates': [],
            'electorates': [],
            'groups': [],
        }

        candidates_file = os.path.join(file_path, 'Candidates.txt')
        if os.path.isfile(candidates_file):
            with open(candidates_file, 'rt') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    result['candidates'].append(row)

        electorates_file = os.path.join(file_path, 'Electorates.txt')
        if os.path.isfile(electorates_file):
            with open(electorates_file, 'rt') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    result['electorates'].append(row)

        groups_file = os.path.join(file_path, 'Groups.txt')
        if os.path.isfile(groups_file):
            with open(groups_file, 'rt') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    result['groups'].append(row)

        return result

    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        return result

    def _parse(self, election_code: str, raw_data: Dict[str, List[Dict[str, Any]]]) -> Dict[str, Any]:
        candidates = raw_data['candidates']
        electorates = raw_data['electorates']
        groups = raw_data['groups']
        result = self._empty_result()

        result['elections'].append({
            'title': self._election_title,
            'description': '',
            'institution': self._election_institution,
            'locationCountry': self._election_country,
            'locationLocalityName': self._election_locality,
            'locationAdministrativeAreaName': self._election_administrative_area,
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

        result['parties'].append({
            'title': 'Independents',
            'description': '',
            'code': self._create_code(election_code, self._independents_party),
            'election': election_code,
            'candidates': [],
            'notes': [],
        })

        election = result['elections'][0]
        assembly = result['assemblies'][0]
        assembly_code = assembly['code']

        electorate_ids = {}
        for electorate in electorates:
            electorate_id = electorate['ecode']
            electorate_name = electorate['electorate']
            electorate_ids[electorate_id] = electorate_name
            electorate_code = self._create_code(assembly_code, electorate_name or self._unknown_electorate)

            if not any(i['code'] == electorate_code for i in result['electorates']):
                result['electorates'].append({
                    'title': electorate_name or self._unknown_electorate,
                    'description': '',
                    'code': electorate_code,
                    'election': election_code,
                    'assembly': assembly_code,
                    'candidates': [],
                    'notes': [],
                })

        party_ids = {}
        for group in groups:
            electorate_id = group['ecode']
            party_id = group['pcode']
            party_name = group['pname'].title()
            party_abbr = group['pabbrev']
            candidate_count = group['cands']

            if party_id not in party_ids:
                party_ids[party_id] = {}

            party_ids[party_id][electorate_id] = {
                'name': party_name,
                'abbr': party_abbr,
                'candidate_count': candidate_count,
            }

            party_code = self._create_code(election_code, party_abbr or party_name)
            if not any([i['code'] == party_code for i in result['parties']]):
                result['parties'].append({
                    'title': party_name or self._unknown_party,
                    'description': party_abbr or '',
                    'candidates': [],
                    'code': party_code,
                    'election': election_code,
                    'notes': [],
                })

        for candidate in candidates:
            electorate_id = candidate['ecode']
            party_id = candidate['pcode']
            candidate_id = candidate['ccode']
            name_last, name_first = [i.strip().title() for i in candidate['cname'].split(',')]

            electorate_name = electorate_ids[electorate_id]

            party_raw = party_ids[party_id][electorate_id]
            party_abbr = party_raw['abbr']
            party_name = party_raw['name']

            ballot_order_number = f'{electorate_id.zfill(2)}{party_id.zfill(2)}{candidate_id.zfill(2)}'
            electorate_code = self._create_code(assembly_code, electorate_name or self._unknown_electorate)
            ballot_code = self._create_code(electorate_code, ballot_order_number or self._unknown_ballot_entry)
            candidate_code = self._create_code(ballot_code, name_last, name_first or '')
            party_code = self._create_code(election_code, party_abbr or party_name)
            electorate_code = self._create_code(assembly_code, electorate_name or self._unknown_electorate)
            electorate = next(i for i in result['electorates'] if i['code'] == electorate_code)
            party = next(i for i in result['parties'] if i['code'] == party_code)

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
