import csv
import os
from typing import Any, Dict, List

from process_base import ProcessBase


class ProcessAuActAdminArea(ProcessBase):
    _election_country = 'Australia'
    _election_institution = ''
    _election_administrative_area = 'Australian Capital Territory'
    _election_locality = ''
    _assembly_abbr = 'l'
    _assembly_title = 'A'

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

    def _load_input(self, file_path: str) -> Dict[str, Any]:
        return self._read_json(file_path)

    def _parse(self, election_code: str, raw_data: Dict[str, List[Dict[str, Any]]]) -> Dict[str, Any]:
        candidates = raw_data['candidates']
        electorates = raw_data['electorates']
        groups = raw_data['groups']

        electorate_ids = {}
        for electorate in electorates:
            electorate_id = electorate['ecode']
            electorate_name = electorate['electorate']
            electorate_ids[electorate_id] = electorate_name

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

        for candidate in candidates:
            electorate_id = candidate['ecode']
            party_id = candidate['pcode']
            candidate_id = candidate['ccode']
            name_last, name_first = [i.strip().title() for i in candidate['cname'].split(',')]

            electorate_name = electorate_ids[electorate_id]
            party = party_ids[party_id][electorate_id]
            a = 1


    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        return result
