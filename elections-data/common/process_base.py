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

    def __init__(self, election_code: str,
                 year: int, month: int, day: int,
                 raw_file: str, input_file: str, output_file: str):
        self._election_year = year
        self._election_month = month
        self._election_day = day
        self._election_code = election_code
        self._this_dir = os.path.dirname(os.path.abspath(__file__))
        self._raw_file = os.path.join(self._this_dir, 'raw', raw_file)
        self._input_file = os.path.join(self._this_dir, input_file)
        self._output_file = os.path.join(self._this_dir, output_file)

    def run(self) -> None:
        print(f"Reading raw data file '{self._raw_file}'.")
        raw_data = self._load_raw(self._raw_file)

        print("Parsing raw data.")
        result = self._parse(self._election_code, raw_data)

        print(f"Reading input data file '{self._input_file}'.")
        input_data = self._load_input(self._input_file)

        print("Applying input data.")
        result = self._augment(result, input_data)

        print(f"Writing output file '{self._output_file}'.")
        with open(self._output_file, 'wt') as f:
            json.dump(result, f, sort_keys=True, indent=2)

    def _load_raw(self, file_path: str):
        raise Exception("Must implement '_load_raw'.")

    def _load_input(self, file_path: str) -> Dict[str, Any]:
        raise Exception("Must implement '_load_input'.")

    def _parse(self, election_code: str, raw_data) -> Dict[str, Any]:
        raise Exception("Must implement '_parse'.")

    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        raise Exception("Must implement '_augment'.")

    def _empty_result(self) -> Dict[str, Any]:
        return {
            "election": {},
            "assemblies": [],
            "electorates": [],
            "ballots": [],
            "parties": [],
            "candidates": []
        }

    def _read_json(self, path: str) -> Dict[str, Any]:
        with open(path) as f:
            return json.load(f)

    def _read_xml(self, path: str):
        tree = elTree.parse(path)
        root = tree.getroot()
        return root

    def _read_csv(self, path: str) -> List[Dict[str, Any]]:
        with open(path) as f:
            reader = csv.DictReader(f)
            for row in reader:
                yield row

    def _create_code(self, *args) -> str:
        result = slugify('-'.join([i for i in args if i]), delim='-', ascii=True)
        return result
