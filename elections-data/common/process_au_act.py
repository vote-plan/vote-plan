import csv
import os
from typing import Any, Dict

from process_base import ProcessBase


class ProcessAuAct(ProcessBase):
    _election_country = 'Australia'
    _election_institution = ''
    _election_administrative_area_name = 'Australian Capital Territory'
    _assembly_abbr = 'l'
    _assembly_title = 'A'

    def _load_raw(self, file_path: str):
        # Note that ACT uses Robinson Rotation,
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

    def _parse(self, election_code: str, raw_data) -> Dict[str, Any]:
        pass

    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        pass
