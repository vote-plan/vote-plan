import json
import os
from pathlib import Path

from process_au_act_admin_area import ProcessAuActAdminArea
from process_au_nat_country import ProcessAuNatCountry
from process_au_nt_admin_area import ProcessAuNtAdminArea
from process_au_qld_admin_area import ProcessAuQldAdminArea
from process_au_qld_locality import ProcessAuQldLocality


class ProcessRun:
    _dir_types = {
        'au-nat-country': ProcessAuNatCountry,
        'au-qld-adminarea': ProcessAuQldAdminArea,
        'au-qld-locality': ProcessAuQldLocality,
        'au-act-adminarea': ProcessAuActAdminArea,
        'au-nt-adminarea': ProcessAuNtAdminArea,
    }
    _compact_json = True

    def run(self):

        results = []

        p = Path('..')
        for item in p.iterdir():
            if not item.is_dir() or item.name == 'common':
                continue
            self._create_election_file(item, results)

        self._create_elections_file(results)

    def _create_election_file(self, item, results):
        name_parts = item.name.split('-')
        code = '-'.join(name_parts[-3:])

        date_parts = name_parts[:3]
        date_parts.extend([None] * 3)
        year, month, day = date_parts[0:3]
        year = int(year, base=10) if year else None
        month = int(month, base=10) if month else None
        day = int(day, base=10) if day else None

        dir_func = self._dir_types.get(code)
        if dir_func:
            processor = dir_func(item.name, year, month, day)
            result = processor.run()
            results.append(result)
        else:
            # raise Exception()
            print(f"Not processing '{item.name}'.")

    def _create_elections_file(self, results):
        elections = [j for i in results if i for j in i.get('elections')]

        this_dir = os.path.dirname(os.path.abspath(__file__))
        output_file = os.path.join(this_dir, '..', '..', 'src', 'assets', 'elections.json')

        with open(output_file, 'wt') as f:
            json.dump(elections, f, sort_keys=True, indent=None if self._compact_json else 2)


ProcessRun().run()
