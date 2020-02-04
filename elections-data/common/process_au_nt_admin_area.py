from typing import Dict, Any

from process_base import ProcessBase


class ProcessAuNtAdminArea(ProcessBase):
    _election_country = 'Australia'
    _election_coverage_type = 'Territory'
    _election_institution = 'Parliament'
    _election_administrative_area = 'Northern Territory'
    _election_locality = ''
    _assembly_abbr = 'l'
    _assembly_title = 'Legislative Assembly'

    def _load_raw(self, file_path: str):
        return {}

    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        return result

    def _parse(self, election_code: str, raw_data) -> Dict[str, Any]:
        result = self._empty_result()

        result['elections'].append({
            'title': f'{self._election_year} {self._election_administrative_area}',
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

        result['parties'].append({
            'title': 'Independents',
            'description': '',
            'code': self._create_code(election_code, self._independents_party),
            'election': election_code,
            'candidates': [],
            'notes': [],
        })

        return result
