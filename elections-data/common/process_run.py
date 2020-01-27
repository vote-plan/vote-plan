from pathlib import Path

from process_au_act_admin_area import ProcessAuActAdminArea
from process_au_nat_country import ProcessAuNatCountry
from process_au_qld_admin_area import ProcessAuQldAdminArea
from process_au_qld_locality import ProcessAuQldLocality


class ProcessRun:

    def run(self):
        dir_types = {
            'au-nat-country': ProcessAuNatCountry,
            'au-qld-adminarea': ProcessAuQldAdminArea,
            'au-qld-locality': ProcessAuQldLocality,
            'au-act-adminarea': ProcessAuActAdminArea,
        }

        p = Path('..')
        for item in p.iterdir():

            if not item.is_dir() or item.name == 'common':
                continue

            name_parts = item.name.split('-')
            code = '-'.join(name_parts[-3:])

            date_parts = name_parts[:2]
            date_parts.extend([None] * 3)
            year, month, day = date_parts[0:3]
            year = int(year, base=10) if year else None
            month = int(month, base=10) if month else None
            day = int(day, base=10) if day else None

            dir_func = dir_types.get(code)
            if dir_func:
                processor = dir_func(item.name, year, month, day)
                processor.run()
            else:
                raise Exception()


ProcessRun().run()
