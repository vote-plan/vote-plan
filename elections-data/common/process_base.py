import csv
import json
import os
import xml.etree.ElementTree as elTree
from typing import Any, Dict
from typing import List

from boltons.strutils import slugify


class ProcessBase:
    _unknown_election = 'unknown-election'
    _unknown_assembly = 'unknown-assembly'
    _unknown_electorate = 'unknown-electorate'
    _unknown_ballot_entry = 'unknown-ballot-entry'
    _unknown_party = 'unknown-party'
    _unknown_candidate = 'unknown-candidate'

    _independents_party = 'independent'
    _compact_json = True
    _input_name = 'input.json'

    def __init__(self, election_code: str, year: int, month: int, day: int):
        self._election_year = year
        self._election_month = month
        self._election_day = day
        self._election_code = election_code
        self._this_dir = os.path.dirname(os.path.abspath(__file__))
        self._raw_dir = os.path.join(self._this_dir, '..', self._election_code)
        self._input_file = os.path.join(self._this_dir, '..', self._election_code, self._input_name)
        self._output_file = os.path.join(self._this_dir, '..', '..', 'src', 'assets', election_code + '.json')

    def run(self) -> Dict[str, Any]:
        print(f"Processing '{os.path.basename(os.path.abspath(self._raw_dir))}'.")
        raw_data = self._load_raw(self._raw_dir)
        result = self._parse(self._election_code, raw_data)

        input_data = self._load_input(self._input_file)
        result = self._augment(result, input_data)

        with open(self._output_file, 'wt') as f:
            json.dump(result, f, sort_keys=True, indent=None if self._compact_json else 2)

        print(f"Done.")
        return result

    def _load_raw(self, file_path: str):
        raise Exception("Must implement '_load_raw'.")

    def _parse(self, election_code: str, raw_data) -> Dict[str, Any]:
        raise Exception("Must implement '_parse'.")

    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Augment the result with data from input data file.
        Additional data is added by referencing items using the `code`.
        The code cannot be changed, other items can be modified or appended.
        """
        # election
        self._augment_item(
            result['elections'], input_data['elections'],
            ['title', 'description', 'institution', 'locationCountry', 'locationAdministrativeAreaName',
             'locationLocalityName', 'coverageType', 'dateYear', 'dateMonth', 'dateDay'],
            ['assemblies', 'parties', 'notes'])

        # party
        self._augment_item(
            result['parties'], input_data['parties'],
            ['title', 'description', 'election'],
            ['candidates', 'notes'])

        # assembly
        self._augment_item(
            result['assemblies'], input_data['assemblies'],
            ['title', 'description', 'election'],
            ['electorates', 'notes'])

        # electorate
        self._augment_item(
            result['assemblies'], input_data['assemblies'],
            ['title', 'description', 'assembly', 'election'],
            ['candidates', 'notes'])

        # candidate
        self._augment_item(
            result['candidates'], input_data['candidates'],
            ['nameFirst', 'nameLast', 'description', 'assembly', 'ballotEntry', 'party', 'election', 'electorate'],
            ['notes'])

        # ballot entry
        self._augment_item(
            result['ballotEntries'], input_data['ballotEntries'],
            ['position', 'name', 'assembly', 'candidate', 'election', 'electorate', 'party', ],
            ['notes'])

        return result

    def _load_input(self, file_path: str) -> Dict[str, Any]:
        return self._read_json(file_path)

    def _empty_result(self) -> Dict[str, Any]:
        return {
            "elections": [],
            "assemblies": [],
            "electorates": [],
            "ballotEntries": [],
            "parties": [],
            "candidates": []
        }

    def _read_json(self, path: str) -> Dict[str, Any]:
        if os.path.isfile(path):
            with open(path) as f:
                return json.load(f)
        return {}

    def _read_xml(self, path: str):
        if os.path.isfile(path):
            tree = elTree.parse(path)
            root = tree.getroot()
            return root
        return None

    def _read_csv(self, path: str) -> List[Dict[str, Any]]:
        if os.path.isfile(path):
            with open(path) as f:
                reader = csv.DictReader(f)
                for row in reader:
                    yield row
        return []

    def _create_code(self, *args) -> str:
        result = slugify('-'.join([str(i) for i in args if i]), delim='-', ascii=True)
        result = result.decode('utf-8')
        return result

    def _add_codes(self, election, assembly, assembly_code, party, party_code,
                   electorate, electorate_code, candidate_code):
        if assembly_code not in election['assemblies']:
            election['assemblies'].append(assembly_code)

        if party_code not in election['parties']:
            election['parties'].append(party_code)

        if electorate_code not in assembly['electorates']:
            assembly['electorates'].append(electorate_code)

        if candidate_code not in electorate['candidates']:
            electorate['candidates'].append(candidate_code)

        if candidate_code not in party['candidates']:
            party['candidates'].append(candidate_code)

    def _match_code(self, result_code: str, additional_code: str) -> bool:
        """If no code is specified, then the additional data applies to all items.
        The code is matched by 'contain', so the code can be a partial code."""

        if not additional_code:
            return True

        return additional_code in result_code

    def _augment_item(self, result_item, input_data_item, replace_keys, addition_key):
        for input_item in input_data_item:
            matching_items = [i for i in result_item if self._match_code(i['code'], input_item['code'])]
            for key in replace_keys:
                if key in input_item:
                    self._augment_replace(matching_items, key, input_item[key])
            for key in addition_key:
                if key in input_item:
                    self._augment_additions(matching_items, key, input_item[key])

    def _augment_replace(self, items: List[Dict[str, Any]], key: str, new_value):
        for item in items:
            item[key] = new_value

    def _augment_additions(self, items: List[Dict[str, List]], key: str, new_values: List):
        for item in items:
            item[key].extend(new_values)
