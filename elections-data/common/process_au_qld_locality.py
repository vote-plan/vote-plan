from typing import Dict, Any

from process_base import ProcessBase


class ProcessAuQldLocality(ProcessBase):
    _election_title = 'Local Government Election'
    _election_country = 'Australia'
    _election_institution = 'Legislative Assembly'
    _election_administrative_area = 'Queensland'
    _election_locality = ''
    _assembly_abbr = 'l'
    _assembly_title = 'Legislative Assembly'

    def _load_raw(self, file_path: str):
        return {}

    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        return result

    def _parse(self, election_code: str, raw_data) -> Dict[str, Any]:
        # TODO: each local government has a separate election, but they are all held at the same time.
        # TODO: once more data is available, generate an election per local government, with associated information.
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

        return result
